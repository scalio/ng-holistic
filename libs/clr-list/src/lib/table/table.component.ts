import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    Inject,
    InjectionToken,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList
} from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import * as R from 'ramda';
import { of, Subject, throwError } from 'rxjs';
import { catchError, filter, finalize, flatMap, map, take, takeUntil, tap } from 'rxjs/operators';
import { Memoize } from 'typescript-memoize';
import { FilterService } from '../filter.service';
import { CustomCellDirective } from './custom-cell.directive';
import { RowDetailDirective } from './row-detail.directive';
import {
    defaultTableDataProviderConfig,
    HLC_CLR_TABLE_CELL_MAP,
    HLC_CLR_TABLE_DATA_PROVIDER_CONFIG,
    HLC_CLR_TABLE_PAGINATOR_ITEMS,
    PaginatorItems,
    TableCellMap,
    TableDataProviderConfig
} from './table.config';
import { Table, TableDescription } from './table.types';

export interface TableCustomCellsProvider {
    customCells: QueryList<CustomCellDirective>;
}

export const HLC_CLR_TABLE_CUSTOM_CELLS_PROVIDER = new InjectionToken<TableCustomCellsProvider>(
    'HLC_CLR_TABLE_CUSTOM_CELLS_PROVIDER'
);

@Component({
    selector: 'hlc-clr-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrTableComponent implements TableCustomCellsProvider, OnDestroy {
    private readonly cellMap: TableCellMap;
    private state: ClrDatagridStateInterface;
    private _dataProviderState: any;
    private _paginator: Table.Data.Paginator | undefined;
    /**
     * FIX : Control unexpected behaviour
     * See following comments for this variable
     */
    private _freezeInitialStateChange: boolean | undefined;
    private destroy$ = new Subject();
    readonly dataProviderConfig: TableDataProviderConfig;
    errorMessage: string | undefined;

    @Input() aggregateRow: Table.AggregateRow | undefined;

    @Input() filter: any;

    /// selected

    @Output() selectedRowsChanged = new EventEmitter<Table.Row[]>();

    /** selected is passed to datagrid by ref and manipulated with mutations on array itself 👎
        we need to distinguish when selected was really changed
    */
    private _selected: any[] | undefined;
    private __selected: any[] | undefined;

    get selectedRows() {
        return this._selected;
    }

    /**
     * Latest data providers state, for which data was loaded
     */
    get dataProviderState() {
        return this._dataProviderState;
    }

    /**
     * Ids of the selected rows
     * In order to activate select rows pass in this property empty array.
     */
    @Input()
    set selectedRows(val: any[] | undefined) {
        this._selected = val;
        // copy in order to compare 'changed' value with it to check if selected really changed
        this.__selected = val && [...val];
    }

    /**
     * Row details template
     */
    @ContentChild(RowDetailDirective) rowDetail: RowDetailDirective | undefined;

    /**
     * Custom cells
     */
    @ContentChildren(CustomCellDirective) customCells: QueryList<CustomCellDirective>;

    /**
     * Redux like integration with external store for rows
     */
    @Input() rows: Table.Row[];
    @Input() set paginator(val: Table.Data.Paginator | undefined) {
        this._paginator = val;
        this.updateStatePage(val);
    }

    get paginator() {
        return this._paginator;
    }

    @Input() loading = false;

    /**
     * Regualr integration, just load data and keep them locally
     */
    @Input() dataProvider: Table.Data.DataProvider | undefined;
    @Input() table: TableDescription | undefined;

    /**
     * Value will be already mapped by config.dataProvider.mapState
     */
    @Output() stateChanged = new EventEmitter<any>();
    @Output() rowAction = new EventEmitter<Table.RowActionEvent>();
    @Output() cellClick = new EventEmitter<Table.CellClickEvent>();

    constructor(
        private readonly cdr: ChangeDetectorRef,
        @Inject(HLC_CLR_TABLE_CELL_MAP)
        cellMaps: TableCellMap[],
        @Optional()
        @Inject(HLC_CLR_TABLE_DATA_PROVIDER_CONFIG)
        dataProviderConfig?: TableDataProviderConfig,
        @Optional()
        @Inject(HLC_CLR_TABLE_CUSTOM_CELLS_PROVIDER)
        private readonly containerCustomCellsProvider?: TableCustomCellsProvider,
        @Optional()
        private readonly filterService?: FilterService,
        @Optional()
        @Inject(HLC_CLR_TABLE_PAGINATOR_ITEMS)
        readonly paginatorItems?: PaginatorItems
    ) {
        this.dataProviderConfig = dataProviderConfig || defaultTableDataProviderConfig;
        this.cellMap = R.mergeAll(cellMaps);
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    getAggrColValue(col: Table.Column) {
        if (!this.aggregateRow || !this.rows || !this.aggregateRow[col.id]) {
            return '';
        }

        const vals = R.pluck(col.id, this.rows);

        return this.aggregateRow[col.id](vals, this.rows) || '';
    }

    // selected

    onSelectedRowsChanged(event: any[]) {
        event = R.reject(R.isNil, event);
        if (R.equals(event, this.__selected)) {
            return;
        }
        this.selectedRows = event;
        const selectedItems = this.rows.filter(f => event.indexOf(f.id) !== -1);
        this.selectedRowsChanged.emit(selectedItems);
    }

    /**
     * Inline integration, state inside component
     */
    onRefresh(state: ClrDatagridStateInterface) {
        // sometimes we have to ignore onRefresh, see comments bellow
        if (this._freezeInitialStateChange === true) {
            this._freezeInitialStateChange = false;
            return;
        }

        // console.log('111', state, this.state);
        if (this.state && R.isEmpty(state)) {
            // when datagrid is destroyed it invokes clrDgRefresh (sick !) with empty object
            // just ignore
            return;
        }

        if (state && state.page && !this.state.page) {
            // first time state.page recieved, usually after first load, just ignore
            this.state = state;
            return;
        }

        const dataProvider = this.dataProvider;
        if (!dataProvider) {
            return;
        }

        let state$ = of(state);

        if (this.filterService) {
            // Value is observable, handle case when filter created with already initialized value and we
            // have to use them on initial search
            // map filter value -> state filter value
            state$ = this.filterService.value.pipe(
                map(
                    R.pipe(
                        R.toPairs,
                        R.map(([property, value]) => ({ property, value }))
                    )
                ),
                map(filters => ({ ...state, filters }))
            );
        }

        state$
            .pipe(
                // ignore if there is no changes on state
                filter(
                    R.pipe(
                        R.equals(this.state),
                        R.not
                    )
                ),
                tap(st => this.stateChanged.emit(st)),
                flatMap(st => this.loadData(dataProvider, st))
            )
            .subscribe(() => {});
    }

    loadData(dataProvider: Table.Data.DataProvider, state: ClrDatagridStateInterface) {
        const dpState = this.dataProviderConfig.mapState(state);

        this.loading = true;
        this.cdr.detectChanges();
        return dataProvider.load(dpState).pipe(
            takeUntil(this.destroy$),
            take(1),
            tap(res => {
                const mpResult = this.dataProviderConfig.mapResult(res);
                this.rows = mpResult.rows;
                this.state = state;
                this._dataProviderState = dpState;
                this.errorMessage = undefined;
                // map paginator
                if (mpResult.paginator) {
                    // page state will be updated automatically
                    this.paginator = mpResult.paginator;
                    // for insitial state change onRefresh is invoked by datagrid with incorrect parameters
                    // for example if on first load `to = 34 and size = 50` data grid will invoke onRefresh with
                    // `to = 49 and size = 50`
                    if (this._freezeInitialStateChange === undefined) {
                        this._freezeInitialStateChange = true;
                    }
                    // console.log('222', this.state, this.paginator);
                }
            }),
            catchError(err => {
                this.errorMessage = err;
                return throwError(err);
            }),
            finalize(() => {
                this.loading = false;
                try {
                    // on destroy component, grid invokes clrDgRefresh (
                    this.cdr.detectChanges();
                } catch (err) {
                    console.error(err);
                }
            })
        );
    }

    isRowActive(_: Table.RowBase) {
        return false;
    }

    getColSort(col: Table.ColumnBase) {
        if (!col.sort) {
            return undefined;
        }
        if (typeof col.sort === 'string') {
            return col.sort;
        }
        if (typeof col.sort === 'boolean') {
            return col.id;
        }
    }

    getCellClass(cell: Table.Column, row: Table.Row) {
        if (cell.format) {
            const fmt = cell.format(row[cell.id], row);
            if (!fmt) {
                return '';
            }
            return typeof fmt === 'string' ? undefined : fmt.cls;
        } else {
            return undefined;
        }
    }

    getCellDisplayValue(cell: Table.Column, row: Table.Row) {
        if (cell.format) {
            const fmt = cell.format(row[cell.id], row);
            if (!fmt) {
                return '';
            }
            return typeof fmt === 'string' ? fmt : fmt.val || '';
        } else {
            return row[cell.id];
        }
    }

    refreshState() {
        this.onRefresh(this.state);
    }

    addRow(row: Table.Row) {
        this.rows = R.insert(0, row, this.rows);
        this.cdr.markForCheck();
    }

    upadteRow(row: Table.Row) {
        const index = R.findIndex(R.eqProps('id', row), this.rows);
        if (index !== -1) {
            this.rows = R.update(index, row, this.rows);
            this.cdr.markForCheck();
        }
    }

    removeRow(row: Table.Row) {
        const index = R.findIndex(R.eqProps('id', row), this.rows);
        if (index !== -1) {
            this.rows = R.remove(index, 1, this.rows);
            this.cdr.markForCheck();
        }
    }

    getCellComponentType(cell: Table.MapColumns.MapColumn) {
        return this.cellMap[cell.kind];
    }

    getCustomCellDirective(cell: Table.CustomColumn) {
        const dir = this.customCells.find(f => f.hlcClrCustomCell === cell.id);
        if (dir) {
            return dir;
        }
        if (this.containerCustomCellsProvider) {
            return this.containerCustomCellsProvider.customCells.find(f => f.hlcClrCustomCell === cell.id);
        }
    }

    @Memoize()
    getDetailsRows(row: Table.Row) {
        if (!this.table || !this.table.details) {
            return [];
        }
        return this.table.details.rows(row);
    }

    // trackBy

    trackByCol(i: any, col: Table.ColumnBase) {
        return col ? col.id : i;
    }

    trackByRow(_: any, row: Table.RowBase) {
        return row.id;
    }

    trackByDetailsRow(i: any) {
        return i;
    }

    trackByDetail(i: number) {
        return i;
    }

    //
    onPageSizeChanged(size: number) {
        // everytime just reset to first page
        const state = R.assocPath(['page'], { size, from: 0, to: size - 1 }, this.state || {});
        this.onRefresh(state);
        // after page size state changed onRefresh is invoked by datagrid with incorrect (staled) parameters
        this._freezeInitialStateChange = undefined;
    }

    /**
     * Sync paginator with page field of state
     */
    private updateStatePage(paginator: Table.Data.Paginator | undefined) {
        if (!paginator) {
            // TODO : update dataProviderState ?
            if (this.state) {
                this.state.page = undefined;
            }
            return;
        }
        const size = paginator.pageSize;
        const from = (paginator.pageIndex - 1) * size;
        let to = from + size - 1;
        to = paginator.length - to >= 0 ? to : paginator.length - from - 1;
        // calcaulate correct page in order to skip next onRefresh, when page items size changed
        this.state.page = { from, to, size };
    }

    //
    getDetailsCol(forColId: string) {
        return R.pipe(
            R.pathOr([], ['details', 'cols']),
            R.find(R.propEq('id', forColId))
        )(this.table);
    }

    //
    getRowActions(row: Table.Row) {
        const actions =
            this.table &&
            this.table.rowActions &&
            (typeof this.table.rowActions === 'function' ? this.table.rowActions(row) : this.table.rowActions);

        return actions && actions.length > 0 ? actions : undefined;
    }

    onActionClick(action: Table.RowAction, row: Table.Row) {
        this.rowAction.emit({ action, row });
    }

    onCellClick(cell: Table.ColumnBase, row: Table.Row) {
        this.cellClick.emit({ cell, row });
    }
}
