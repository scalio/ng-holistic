import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Table, TableData } from '../table/table.types';
import { ClrFormFields } from '@ng-holistic/clr-forms';
import * as R from 'ramda';
import { TableComponent } from '../table/table.component';

@Component({
    selector: 'hlc-clr-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
    // Table props delegators

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

    // Filter props delegator

    @Input() filterFields: ClrFormFields.FormField[];

    @Output() filter = new EventEmitter<any>();

    @ViewChild(TableComponent) tableComponent: TableComponent;

    constructor() {}

    ngOnInit() {}

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
