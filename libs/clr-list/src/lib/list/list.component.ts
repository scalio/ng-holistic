import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    Optional,
    Output,
    QueryList,
    SkipSelf,
    ViewChild
} from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ClrFormFields } from '@ng-holistic/clr-forms';
import { concat } from 'ramda';
import { FilterService } from '../filter.service';
import { CustomCellDirective } from '../table/custom-cell.directive';
import { RowDetailDirective } from '../table/row-detail.directive';
import {
    HlcClrTableComponent,
    HLC_CLR_TABLE_CUSTOM_CELLS_PROVIDER,
    TableCustomCellsProvider
} from '../table/table.component';
import { Table, TableDescription } from '../table/table.types';
import { defaultListLabelsConfig, HLC_CLR_LIST_LABELS_CONFIG, ListLabelsConfig } from './list.config';

@Component({
    selector: 'hlc-clr-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: HLC_CLR_TABLE_CUSTOM_CELLS_PROVIDER,
            useExisting: forwardRef(() => HlcClrListComponent)
        },
        FilterService
    ]
})
export class HlcClrListComponent implements TableCustomCellsProvider, AfterViewInit {
    labelsConfig: ListLabelsConfig;

    @Input() hideFilter = false;
    @Input() hidePaginator = false;
    @Input() disableSorting = false;

    @Input() isFilterShown = true;
    @Input() aggregateRow: Table.AggregateRow | undefined;
    @Input() selectedRows: any[];

    // Filter props delegator
    @Input() filterFields: ClrFormFields.FormField[];

    // Table props delegators

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
     * Enable darg & drop
     */
    @Input() dragEnabled = false;
    @Input() rowSelectable = false;

    // tslint:disable-next-line:no-input-rename
    @Input('rowDetail') rowDetailInput: RowDetailDirective | undefined;

    /**
     * Row details template
     */
    @ContentChild(RowDetailDirective) rowDetailTemplate: RowDetailDirective | undefined;

    /**
     * Custom cells
     */
    @ContentChildren(CustomCellDirective) customCellsContent: QueryList<CustomCellDirective>;

    /**
     * Value will be already mapped by config.dataProvider.mapState
     */
    @Output() stateChanged = new EventEmitter<any>();
    @Output() filter = new EventEmitter<any>();

    @Output() rowAction = new EventEmitter<Table.RowActionEvent>();
    @Output() selectedRowsChanged = new EventEmitter<Table.Row[]>();
    @Output() cellClick = new EventEmitter<Table.CellClickEvent>();
    @Output() drop = new EventEmitter<Table.DropEvent>();

    @ViewChild(HlcClrTableComponent) tableComponent: HlcClrTableComponent;

    constructor(
        @Optional()
        @Inject(HLC_CLR_LIST_LABELS_CONFIG)
        labelsConfig?: ListLabelsConfig,
        @Optional()
        @SkipSelf()
        @Inject(HLC_CLR_TABLE_CUSTOM_CELLS_PROVIDER)
        private readonly containerCustomCellsProvider?: TableCustomCellsProvider
    ) {
        this.labelsConfig = labelsConfig || defaultListLabelsConfig;
    }

    ngAfterViewInit() {
        if (!this.hasFilters) {
            // If there is no filters on init, loading still should be dispatched with empty filter
            this.setState({});
        }
    }

    get customCells() {
        return concat(
            this.customCellsContent ? this.customCellsContent.toArray() : [],
            (this.containerCustomCellsProvider && this.containerCustomCellsProvider.customCells) || []
        );
    }

    get rowDetail() {
        return this.rowDetailInput || this.rowDetailTemplate;
    }

    setState(state: ClrDatagridStateInterface) {
        this.tableComponent.setState(state);
    }

    addRow(row: Table.Row) {
        this.tableComponent.addRow(row);
    }

    upadteRow(row: Table.Row) {
        this.tableComponent.upadteRow(row);
    }

    removeRow(row: Table.Row) {
        this.tableComponent.removeRow(row);
    }

    onFilter(filter: any) {
        this.tableComponent.refreshStateForce();
        this.filter.emit(filter);
    }

    onTableStateChanged(state: any) {
        this.stateChanged.emit(state);
    }

    onToggleFilter() {
        this.isFilterShown = !this.isFilterShown;
    }

    get hasFilters() {
        return !!this.filterFields && this.filterFields.length > 0;
    }
}
