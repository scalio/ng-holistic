import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Optional,
    Output,
    Inject,
    OnDestroy,
    ChangeDetectorRef
} from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { TableConfig, HLC_CLR_TABLE_CONFIG, defaultTableConfig } from './table.config';
import { Table, TableData } from './table.types';
import { take, takeUntil, finalize, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'hlc-clr-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnDestroy {
    private state: ClrDatagridStateInterface;
    private destroy$ = new Subject();
    readonly config: TableConfig;

    /**
     * Redux like integration with external store for rows
     */
    @Input() rows: Table.Row[];
    @Input() loading = false;

    /**
     * Regualr integration, just load data and keep them locally
     */
    @Input() dataProvider: TableData.DataProvider | undefined;
    @Input() table: Table.TableDescription | undefined;

    /**
     * Value will be already mapped by config.dataProvider.mapState
     */
    @Output() stateChanged = new EventEmitter<any>();

    constructor(
        private readonly cdr: ChangeDetectorRef,
        @Optional() @Inject(HLC_CLR_TABLE_CONFIG) config?: TableConfig
    ) {
        this.config = config || defaultTableConfig;
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    /**
     * Inline integration, state inside component
     */
    onRefresh(state: ClrDatagridStateInterface) {
        const mpState = this.config.dataProvider.mapState(state);
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
                        const mpResult = this.config.dataProvider.mapResult(res);
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
        this.onRefresh({...this.state, ...state});
    }

    // trackBy

    trackByCol(_: any, col: Table.ColumnBase) {
        return col.id;
    }

    trackByRow(_: any, row: Table.RowBase) {
        return row.id;
    }
}
