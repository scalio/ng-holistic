import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewChild,
    forwardRef
} from '@angular/core';
import { ClrFormFields } from '@ng-holistic/clr-forms';
import * as R from 'ramda';
import { CustomCellDirective } from '../table/custom-cell.directive';
import {
    HLC_CLR_TABLE_CUSTOM_CELLS_PROVIDER,
    TableComponent,
    TableCustomCellsProvider
} from '../table/table.component';
import { Table, TableDescription } from '../table/table.types';

@Component({
    selector: 'hlc-clr-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: HLC_CLR_TABLE_CUSTOM_CELLS_PROVIDER,
            useExisting: forwardRef(() => ListComponent)
        }
    ]
})
export class ListComponent implements TableCustomCellsProvider, OnInit {
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

    @ViewChild(TableComponent) tableComponent: TableComponent;

    constructor() {}

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
        const filters = R.pipe(
            R.toPairs,
            R.map(([property, value]) => ({ property, value }))
        )(filter);

        this.tableComponent.refreshState({ filters });
    }

    onTableStateChanged(state: any) {
        this.stateChanged.emit(state);
    }
}
