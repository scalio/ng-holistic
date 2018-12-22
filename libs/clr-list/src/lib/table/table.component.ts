import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
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
import { of, Subject } from 'rxjs';
import { finalize, flatMap, map, take, takeUntil, tap } from 'rxjs/operators';
import { FilterService } from '../filter.service';
import { CustomCellDirective } from './custom-cell.directive';
import {
    defaultTableDataProviderConfig,
    HLC_CLR_TABLE_CELL_MAP,
    HLC_CLR_TABLE_DATA_PROVIDER_CONFIG,
    HLC_CLR_TABLE_PAGINATOR_ITEMS,
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
export class TableComponent implements TableCustomCellsProvider, OnDestroy {
    private readonly cellMap: TableCellMap;
    private state: ClrDatagridStateInterface;
    private destroy$ = new Subject();
    readonly dataProviderConfig: TableDataProviderConfig;

    @Input() aggregateRow: Table.AggregateRow | undefined;

    @Input() filter: any;

    /**
     * Custom cells
     */
    @ContentChildren(CustomCellDirective) customCells: QueryList<CustomCellDirective>;

    /**
     * Redux like integration with external store for rows
     */
    @Input() rows: Table.Row[];
    @Input() paginator: Table.Data.Paginator | undefined;
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
        readonly paginatorItems?: any[]
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

    /**
     * Inline integration, state inside component
     */
    onRefresh(state: ClrDatagridStateInterface) {
        if (this.state && R.isEmpty(state)) {
            // when datagrid is detroyed it invokes clrDgRefresh (sick !) with empty object
            // just ignore
            return;
        }

        if (state.page && !this.state.page) {
            // first time state.page recieved, usually after first load, just ignore
            this.state = state;
            return;
        }

        this.stateChanged.emit(state);

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

        state$.pipe(flatMap(st => this.loadData(dataProvider, st))).subscribe(() => {});
    }

    loadData(dataProvider: Table.Data.DataProvider, state: ClrDatagridStateInterface) {
        const mpState = this.dataProviderConfig.mapState(state);

        this.loading = true;
        this.cdr.detectChanges();
        return dataProvider.load(mpState).pipe(
            takeUntil(this.destroy$),
            take(1),
            tap(res => {
                const mpResult = this.dataProviderConfig.mapResult(res);
                this.rows = mpResult.rows;
                this.state = state;
                if (mpResult.paginator) {
                    this.paginator = mpResult.paginator;
                }
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

    // trackBy

    trackByCol(_: any, col: Table.ColumnBase) {
        return col.id;
    }

    trackByRow(_: any, row: Table.RowBase) {
        return row.id;
    }

    onPageSizeChanges(val: number) {
        console.log('+++', val);
    }
}
