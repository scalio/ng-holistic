import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { equals, assocPath } from 'ramda';
import { List } from '@ng-holistic/lists';
import { CellClickEvent, Column, TableConfig } from './list-table.types';
import { Cell, mapRefreshParams, mapRows, Row } from './list-table.utils';
@Component({
    selector: 'hlc-list-table',
    templateUrl: './list-table.component.html',
    styleUrls: ['./list-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListTableComponent implements OnInit, OnChanges {
    private latestRefresh: ClrDatagridStateInterface | undefined;

    @Input() config: TableConfig;

    @Input() activeItemId: string | undefined;

    @Input() items: any[] | undefined;

    @Input() paginator: List.Paginator;

    @Input() cellTemplate: TemplateRef<any>;

    @Input() rowDetailTemplate: TemplateRef<any>;

    @Input() loading: boolean;

    @Output() refresh = new EventEmitter<List.SearchParams>();

    @Output() cellClick = new EventEmitter<CellClickEvent>();

    @Output() selectedChange = new EventEmitter<any[]>();

    // selectors

    // is multi selector on
    get isMultiSelector() {
        return this.config && this.config.selector === 'multi';
    }

    // selected rows ids
    // selected is passed to datagrid by ref and manipulated with mutations on array itself 👎
    // we need distinguish when selected was really changed
    _selected: any[] = [];
    __selected: any[] = [];

    get selected() {
        return this.isMultiSelector ? this._selected : undefined;
    }

    @Input()
    set selected(val: any[] | undefined) {
        val = val || [];
        this._selected = val;
        // copy in order to compare 'changed' value with it to check if selected really changed
        this.__selected = val && val.map(x => x);
    }

    private isSelectedNotChanged(val: any) {
        return equals(val, this.__selected);
    }
    //

    constructor() {}

    ngOnInit() {}

    ngOnChanges(change: SimpleChanges) {
        if (change['items']) {
            // just reset selected
            // TODO: we could do better resetting only items which are not currently in items 🤔
            this.onSelectedChanged([]);
        }
    }

    get columns() {
        return this.config ? this.config.cols : [];
    }

    get rows(): Row[] {
        if (!this.items) {
            return [];
        }
        return mapRows(this.config, this.items) as any;
    }

    onRefresh(state: ClrDatagridStateInterface) {
        this.refresh.emit(mapRefreshParams(state));
        this.latestRefresh = state;
    }

    onCellClick(cell: Cell, row: any) {
        this.cellClick.emit({ cell, row });
    }

    trackByCol(_: number, col: Column) {
        return col.id;
    }

    trackByRow(_: number, row: Row) {
        return row.id;
    }

    trackByCell(i: number) {
        return i;
    }

    onSelectedChanged(event: any[]) {
        if (this.isSelectedNotChanged(event)) {
            return;
        }
        this.selected = event;
        const selectedItems = (this.items || []).filter(f => event.indexOf(f.id) !== -1);
        this.selectedChange.emit(selectedItems);
    }

    // details

    get detialsType() {
        return (this.config.rowDetails && this.config.rowDetails.type) || null;
    }

    getDetails(row: any) {
        return this.config.rowDetails && this.config.rowDetails.getDetails
            ? this.config.rowDetails.getDetails(row)
            : [row];
    }

    //
    isActiveRow(row: any) {
        return row['id'] === this.activeItemId;
    }

    // *ngIf on clr-dg-footer doesn't work correctly, from time to time list displayed corrupted after loading
    get _paginator() {
        return this.paginator || { pageIndex: 1, pageSize: 25, length: 0 };
    }

    //
    get pageSizeItems() {
        return [
            {
                key: 25,
                label: 25
            },
            {
                key: 50,
                label: 50
            },
            {
                key: 100,
                label: 100
            }
        ];
    }

    onPageSizeChanged(pageSize: any) {
        const refresh = assocPath(['page', 'size'], parseInt(pageSize, 0), this.latestRefresh || {});
        this.onRefresh(refresh);
    }
}
