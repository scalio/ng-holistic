import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    InjectionToken,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { ClrDatagrid, ClrDatagridRow, ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { HlcHotkeysContainerService } from '@ng-holistic/clr-common';
import * as R from 'ramda';
import { of, Subject, throwError } from 'rxjs';
import { catchError, filter, finalize, flatMap, map, take, takeUntil, tap } from 'rxjs/operators';
import { Memoize } from 'typescript-memoize';
import { FilterService } from '../filter.service';
import { RowsManagerService } from '../rows-manager.service';
import { CustomCellDirective } from './custom-cell.directive';
import { RowDetailDirective } from './row-detail.directive';
import {
    defaultTableDataProviderConfig,
    HLC_CLR_TABLE_CELL_FORMAT_MAP,
    HLC_CLR_TABLE_CELL_MAP,
    HLC_CLR_TABLE_DATA_PROVIDER_CONFIG,
    HLC_CLR_TABLE_PAGINATOR_ITEMS,
    PaginatorItems,
    TableCellFormatMap,
    TableCellMap,
    TableDataProviderConfig
} from './table.config';
import { Table, TableDescription } from './table.types';
import { mapPageState, omitUndefinedFileds } from './table.utils';
import { HlcTableKeysManagerService } from './utils/table-keys-manager';

export interface TableCustomCellsProvider {
    customCells: CustomCellDirective[];
}

export const HLC_CLR_TABLE_CUSTOM_CELLS_PROVIDER = new InjectionToken<TableCustomCellsProvider>(
    'HLC_CLR_TABLE_CUSTOM_CELLS_PROVIDER'
);

@Component({
    selector: 'hlc-clr-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [HlcHotkeysContainerService, HlcTableKeysManagerService]
})
export class HlcClrTableComponent implements TableCustomCellsProvider, OnDestroy, AfterViewInit {
    private readonly cellMap: TableCellMap;
    private readonly cellFormatMap: TableCellFormatMap;
    private state: ClrDatagridStateInterface;
    private _initState: ClrDatagridStateInterface | undefined;
    private _dataProviderState: any;
    private _paginator: Table.Data.Paginator | undefined;
    private _activeRow: Table.RowBase | undefined;
    private _rows: Table.Row[];

    /**
     * FIX : Control unexpected behaviour
     * See following comments for this variable
     */
    private _freezeCount: number | undefined;
    private _freezeInitialStateChange: boolean | undefined;
    private destroy$ = new Subject();
    readonly dataProviderConfig: TableDataProviderConfig;
    errorMessage: string | undefined;

    @Input() hidePaginator = false;
    @Input() disableSorting = false;

    @Input() rowDetail: RowDetailDirective | undefined;

    @Input() aggregateRow: Table.AggregateRow | undefined;
    @Input() rowSelectable = false;

    /**
     * Enable darg & drop
     */
    @Input() dragEnabled = false;

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
    //@ts-ignore
    @ContentChild(RowDetailDirective, { static: false }) rowDetailContent: RowDetailDirective | undefined;

    /**
     * Custom cells
     */
    @ContentChildren(CustomCellDirective) customCellsContent: QueryList<CustomCellDirective>;

    /**
     * Redux like integration with external store for rows
     */
    @Input() set rows(val: Table.Row[]) {
        this._rows = val;
        this.keysManager.onRowsChanged(val);
    }

    get rows() {
        return this._rows;
    }

    @Input() set paginator(val: Table.Data.Paginator | undefined) {
        this._paginator = val;
        const page = val && mapPageState(val);
        if (!page) {
            if (this.state) {
                this.state.page = undefined;
            }
        } else {
            if (this.state) {
                this.state.page = page;
            } else {
                this.state = { page };
            }
        }
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

    @Input() sortFn: ((a: Table.Row, b: Table.Row) => number) | undefined;
    @Input() isCompact = false;

    @Input() setFirstRowActiveOnFocus = true;

    /**
     * Value will be already mapped by config.dataProvider.mapState
     */
    @Output() stateChanged = new EventEmitter<any>();
    @Output() rowAction = new EventEmitter<Table.RowActionEvent>();
    // TODO : rename rowClick
    @Output() cellClick = new EventEmitter<Table.CellClickEvent>();

    @Output() drop = new EventEmitter<Table.DropEvent>();

    @ViewChildren('datagridRow')
    datagridRows: QueryList<ClrDatagridRow>;

    @ViewChild(ClrDatagrid, { static: false }) clrDatagrid: ClrDatagrid;

    constructor(
        private readonly cdr: ChangeDetectorRef,
        private readonly keysManager: HlcTableKeysManagerService,
        private readonly hotkeysContainer: HlcHotkeysContainerService,
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
        @Optional()
        @Inject(HLC_CLR_TABLE_CELL_MAP)
        cellMaps: TableCellMap[],
        @Optional()
        @Inject(HLC_CLR_TABLE_CELL_FORMAT_MAP)
        cellFormatMaps: TableCellFormatMap[],
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
        readonly paginatorItems?: PaginatorItems,
        @Optional()
        rowsManagerService?: RowsManagerService
    ) {
        this.dataProviderConfig = dataProviderConfig || defaultTableDataProviderConfig;
        this.cellMap = cellMaps ? R.mergeAll(cellMaps) : {};
        this.cellFormatMap = cellFormatMaps ? R.mergeAll(cellFormatMaps) : {};

        if (rowsManagerService) {
            rowsManagerService.addRow$.pipe(takeUntil(this.destroy$)).subscribe(row => this.addRow(row));
            rowsManagerService.updateRow$.pipe(takeUntil(this.destroy$)).subscribe(row => this.upadteRow(row));
            rowsManagerService.removeRow$.pipe(takeUntil(this.destroy$)).subscribe(row => this.removeRow(row));
        }

        // Key manager

        keysManager.activeRowChanged.pipe(takeUntil(this.destroy$)).subscribe(row => {
            this._activeRow = row;
            this.cdr.markForCheck();
        });

        keysManager.activePageChanged.pipe(takeUntil(this.destroy$)).subscribe(page => {
            this.onPageChanged(page);
        });

        keysManager.refresh.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.onRefresh(this.state, true);
        });

        keysManager.action.pipe(takeUntil(this.destroy$)).subscribe(type => {
            this.cellClick.emit({ row: this._activeRow as any, type });
        });
    }

    ngAfterViewInit() {
        this.keysManager.setDatagridRows(this.datagridRows);
        //  we cant setup tabindex on datagrid in template since don't have
        // access to the rendered table element (separated from toolbox)
        const datagridDiv = this.elementRef.nativeElement.querySelector('div.datagrid');
        this.renderer.setAttribute(datagridDiv, 'tabindex', '1');
        this.renderer.listen(datagridDiv, 'focus', () => this.onFocus());
        this.renderer.listen(datagridDiv, 'blur', () => this.onBlur());
    }

    get customCells() {
        return this.customCellsContent ? this.customCellsContent.toArray() : [];
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.hotkeysContainer.destroy$.next();
    }

    get _rowDetail() {
        return this.rowDetail || this.rowDetailContent;
    }

    getAggrColValue(col: Table.Column) {
        if (!this.aggregateRow || !this.rows || !this.aggregateRow[col.id]) {
            return '';
        }

        const vals = R.pluck(col.id, this.rows);

        return this.aggregateRow[col.id](vals, this.rows) || '';
    }

    getAggrRow() {
        if (!this.aggregateRow || !this.rows) {
            return undefined;
        }

        return R.pipe(
            R.toPairs,
            R.map(([col, fn]) => [col, (fn as any)(R.pluck(col, this.rows), this.rows)]),
            R.fromPairs
        )(this.aggregateRow);
    }

    // Drag & Drop
    onDrop(event: CdkDragDrop<Table.Row>) {
        this.drop.emit(event);
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
     * force = true, will request data load even if request state is not changed
     */
    onRefresh(state: ClrDatagridStateInterface, force = false) {
        // sometimes we have to ignore onRefresh, see comments bellow
        if (this._freezeInitialStateChange === true) {
            this._freezeInitialStateChange = false;
            return;
        }

        if (this._freezeCount && this._freezeCount > 0) {
            this._freezeCount--;
            return;
        }

        if (this.state && (R.isEmpty(state) || R.isNil(state.page))) {
            // when datagrid is destroyed it invokes clrDgRefresh (sick !) with empty object
            // just ignore
            return;
        }

        const dataProvider = this.dataProvider;
        if (!dataProvider) {
            return;
        }

        if (this._initState) {
            state = this._initState;
            this._initState = undefined;
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
                map(filters => ({ ...state, filters } as any))
            );
        }

        state$
            .pipe(
                // ignore if there is no changes on state
                filter(st => force || !R.equals(this.state, st)),
                tap(st => this.stateChanged.emit(st)),
                flatMap(st => this.loadData(dataProvider, st))
            )
            .subscribe(() => {});
    }

    setState(state: ClrDatagridStateInterface, isInitial = false) {
        if (R.equals(this.state, state)) {
            return;
        }
        const filters = state.filters;
        if (filters) {
            const kvp = filters.map((m: any) => [m.property, m.value]);
            const filterValue = R.fromPairs(kvp as any);
            if (this.filterService) {
                this.filterService.setValue(filterValue);
            }
        }

        if (!isInitial) {
            this.onRefresh(state);
            // Ignore next refesh
            this._freezeInitialStateChange = true;
        } else {
            this._initState = state;
        }
    }

    loadData(dataProvider: Table.Data.DataProvider, state: ClrDatagridStateInterface) {
        const dpState = this.dataProviderConfig.mapState(state);
        this.loading = true;
        this.hotkeysContainer.loading$.next(true);
        this.cdr.detectChanges();
        return dataProvider.load(dpState).pipe(
            takeUntil(this.destroy$),
            take(1),
            tap(res => {
                const mpResult = this.dataProviderConfig.mapResult(res);
                this.rows = mpResult.rows;

                const filters = mpResult.filters;
                const sort = mpResult.sort;
                const page = mpResult.paginator && mapPageState(mpResult.paginator);

                if (this.filterService && filters && filters.length > 0) {
                    // map filters back to filterService model
                    const objFiletrs = R.pipe(
                        R.map(({ property, value }) => [property, value]),
                        R.fromPairs
                    )(filters);
                    this.filterService.setValue(objFiletrs);
                }

                this._paginator = mpResult.paginator;
                this._dataProviderState = dpState;
                this.errorMessage = undefined;

                if (this._freezeCount === undefined) {
                    // for insitial state change onRefresh is invoked number of time before set stable
                    // for example if after loadin page and sort changed onRefersh will be invokde 3 times
                    // sort, old page + sort, page + sort - only latest must be considered as valid onRefresh
                    this._freezeCount = 0;
                    // map paginator
                    if (page && (!state || !R.equals(page, state.page))) {
                        this._freezeCount++;
                    }
                    if (sort && (!state || !R.equals(sort, state.sort))) {
                        this._freezeCount++;
                    }
                }

                this.state = omitUndefinedFileds({ ...state, page, sort, filters });
                if (this.paginator) {
                    const pagesCount = Math.floor(
                        this.paginator.length / this.paginator.pageSize +
                            (this.paginator.length % this.paginator.pageSize === 0 ? 0 : 1)
                    );
                    this.keysManager.onPagesChanged(pagesCount, this.paginator.pageIndex);
                }
            }),
            catchError(err => {
                this.errorMessage = err;
                return throwError(err);
            }),
            finalize(() => {
                this.loading = false;
                this.hotkeysContainer.loading$.next(false);
                // Fix hardly reproducibley bug
                // Sometimes grid just doesn't update itself correctly after load new data
                setTimeout(() => this.clrDatagrid.resize(), 0);
                try {
                    // on destroy component, grid invokes clrDgRefresh (
                    this.cdr.detectChanges();
                } catch (err) {
                    console.warn(err);
                }
            })
        );
    }

    isRowActive(row: Table.RowBase) {
        return this._activeRow && row.id === this._activeRow.id;
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

    getColSortOrder(col: Table.ColumnBase) {
        const sortKey = typeof col.sort === 'string' ? col.sort : col.id;
        const sort = this.state && this.state.sort;
        const tableSort = this.table && this.table.sort;
        if (col.sort && sort) {
            if (sortKey === sort.by) {
                return sort.reverse ? ClrDatagridSortOrder.DESC : ClrDatagridSortOrder.ASC;
            }
        } else if (tableSort) {
            // sort by default column if state doesn't have sort column
            if (typeof tableSort === 'string') {
                if (tableSort === col.id) {
                    return ClrDatagridSortOrder.DESC;
                }
            } else if (tableSort.name === col.id) {
                return tableSort.direction === 'asc' ? ClrDatagridSortOrder.ASC : ClrDatagridSortOrder.DESC;
            }
        }

        return ClrDatagridSortOrder.UNSORTED;
    }

    private getCellFormatResult(cell: Table.Column, row: Table.Row): Table.FormatResult {
        const format = typeof cell.format === 'string' ? this.cellFormatMap[cell.format] : cell.format;
        if (!format) {
            return {};
        }
        const formatResult = format(row[cell.id], row);
        if (!formatResult) {
            return {};
        }
        // if format result is the string, consider it value
        if (typeof formatResult === 'string') {
            return { val: formatResult };
        } else {
            return formatResult;
        }
    }

    getCellClass(cell: Table.Column, row: Table.Row) {
        let res;
        if (typeof cell.cls === 'string') {
            res = cell.cls;
        } else if (typeof cell.cls === 'function') {
            res = cell.cls(row[cell.id], row);
        }

        // we can mix classes from cls and format result
        const { cls } = this.getCellFormatResult(cell, row);

        if (cls) {
            res = (res ? res + ' ' : '') + cls;
        }

        return res;
    }

    getCellDisplayValue(cell: Table.Column, row: Table.Row) {
        if (cell.format) {
            const { val } = this.getCellFormatResult(cell, row);
            if (!val) {
                console.warn('Table cell formatter not found', cell);
            }
            return val;
        } else {
            return row[cell.id];
        }
    }

    refreshStateForce() {
        this.onRefresh(this.state, true);
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
            const cellFromProvider = this.containerCustomCellsProvider.customCells.find(
                f => f.hlcClrCustomCell === cell.id
            );
            if (cellFromProvider) {
                return cellFromProvider;
            }
        }

        console.error('Custom cell template not found', cell, this.containerCustomCellsProvider);
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

    trackByAction(_: any, rowAction: Table.RowAction) {
        return rowAction.id;
    }

    //
    onPageChanged(pageIndex: number) {
        if (!this.paginator || pageIndex === (this.paginator && this.paginator.pageIndex)) {
            return;
        }
        // everytime just reset to first page
        const page = mapPageState({ ...this.paginator, pageIndex });
        this.onRefresh({ ...this.state, page });
        // after page size state changed onRefresh is invoked by datagrid with incorrect (staled) parameters
        this._freezeInitialStateChange = undefined;
    }

    onPageSizeChanged(size: number) {
        // everytime just reset to first page
        const state = R.assocPath(['page'], { size, from: 0, to: size - 1 }, this.state || {});
        this.onRefresh(state);
        // after page size state changed onRefresh is invoked by datagrid with incorrect (staled) parameters
        this._freezeInitialStateChange = undefined;
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
        if (this.rowSelectable) {
            this._activeRow = row;
            this.keysManager.onSetActive(this.rows.indexOf(row));
        }
        this.cellClick.emit({ cell, row, type: 'primary' });
    }

    onFocus() {
        this.hotkeysContainer.focus$.next(true);
        // TODO set timeout to not blink when user click particular row
        if (this.setFirstRowActiveOnFocus && !this._activeRow) {
            const firstRow = this.rows[0];
            if (firstRow) {
                this._activeRow = firstRow;
                this.keysManager.onSetActive(0);
            }
        }
    }

    onBlur() {
        this.hotkeysContainer.focus$.next(false);
    }
}
