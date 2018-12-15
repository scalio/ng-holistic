import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table, TableData } from '../table/table.types';
import { ClrFormFields } from '@ng-holistic/clr-forms';

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

    constructor() {}

    ngOnInit() {}

    onFilterChanged(filter: any) {
        console.log('111', filter);
    }

    onTableStateChanged(state: any) {
        console.log('222', state);
    }
}
