import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewChild
} from '@angular/core';
import { ClrFormFields } from '@ng-holistic/clr-forms';
import { FilterService } from '../filter.service';
import { CustomCellDirective } from '../table/custom-cell.directive';
import {
    HLC_CLR_TABLE_CUSTOM_CELLS_PROVIDER,
    TableComponent,
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
            useExisting: forwardRef(() => ListComponent)
        },
        FilterService
    ]
})
export class ListComponent implements TableCustomCellsProvider, OnInit {
    labelsConfig: ListLabelsConfig;
    @Input() isFilterShown = true;
    @Input() aggregateRow: Table.AggregateRow | undefined;
    @Input() selectedRows: any[];

    /**
     * Custom cells
     */
    @ContentChildren(CustomCellDirective) customCells: QueryList<CustomCellDirective>;

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
     * Value will be already mapped by config.dataProvider.mapState
     */
    @Output() stateChanged = new EventEmitter<any>();

    // Filter props delegator

    @Input() filterFields: ClrFormFields.FormField[];

    @Output() filter = new EventEmitter<any>();

    @Output() rowAction = new EventEmitter<Table.RowActionEvent>();
    @Output() selectedRowsChanged = new EventEmitter<Table.Row[]>();
    @Output() cellClick = new EventEmitter<Table.CellClickEvent>();


    @ViewChild(TableComponent) tableComponent: TableComponent;

    constructor(@Optional() @Inject(HLC_CLR_LIST_LABELS_CONFIG) labelsConfig?: ListLabelsConfig) {
        this.labelsConfig = labelsConfig || defaultListLabelsConfig;
    }

    ngOnInit() {}

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
        this.tableComponent.refreshState();
        this.filter.emit(filter);
    }

    onTableStateChanged(state: any) {
        this.stateChanged.emit(state);
    }

    onToggleFilter() {
        this.isFilterShown = !this.isFilterShown;
    }
}
