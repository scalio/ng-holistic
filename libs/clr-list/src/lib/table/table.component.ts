import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Output
} from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Subject } from 'rxjs';
import { finalize, take, takeUntil, tap } from 'rxjs/operators';
import {
    defaultTableDataProviderConfig,
    HLC_CLR_TABLE_DATA_PROVIDER_CONFIG,
    TableDataProviderConfig,
    HLC_CLR_TABLE_CELL_MAP,
    TableCellMap
} from './table.config';
import { Table, TableDescription } from './table.types';
import { mergeAll } from 'ramda';

@Component({
    selector: 'hlc-clr-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnDestroy {
    private readonly cellMap: TableCellMap;
    private state: ClrDatagridStateInterface;
    private destroy$ = new Subject();
    readonly dataProviderConfig: TableDataProviderConfig;

    /**
     * Redux like integration with external store for rows
     */
    @Input() rows: Table.Row[];
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
        @Inject(HLC_CLR_TABLE_CELL_MAP) cellMaps: TableCellMap[],
        @Optional() @Inject(HLC_CLR_TABLE_DATA_PROVIDER_CONFIG) dataProviderConfig?: TableDataProviderConfig
    ) {
        this.dataProviderConfig = dataProviderConfig || defaultTableDataProviderConfig;
        this.cellMap = mergeAll(cellMaps);
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    /**
     * Inline integration, state inside component
     */
    onRefresh(state: ClrDatagridStateInterface) {
        const mpState = this.dataProviderConfig.mapState(state);
        this.stateChanged.emit(mpState);
        if (this.dataProvider) {
            this.loading = true;
            this.cdr.detectChanges();
            this.dataProvider
                .load(mpState)
                .pipe(
                    takeUntil(this.destroy$),
                    take(1),
                    tap(res => {
                        const mpResult = this.dataProviderConfig.mapResult(res);
                        this.rows = mpResult.rows;
                        this.state = state;
                    }),
                    finalize(() => {
                        this.loading = false;
                        this.cdr.detectChanges();
                    })
                )
                .subscribe(() => {});
        }
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

    refreshState(state: Partial<ClrDatagridStateInterface>) {
        this.onRefresh({ ...this.state, ...state });
    }

    getCellComponentType(cell: Table.MapColumns.MapColumn) {
        return this.cellMap[cell.kind];
    }

    // trackBy

    trackByCol(_: any, col: Table.ColumnBase) {
        return col.id;
    }

    trackByRow(_: any, row: Table.RowBase) {
        return row.id;
    }
}
