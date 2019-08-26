import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    SkipSelf,
    ViewChild
} from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { HlcHotkeysContainerService } from '@ng-holistic/clr-common';
import { ClrFormFields } from '@ng-holistic/clr-forms';
import { concat } from 'ramda';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterService } from '../filter.service';
import { CustomCellDirective } from '../table/custom-cell.directive';
import { RowDetailDirective } from '../table/row-detail.directive';
import {
    HlcClrTableComponent,
    HLC_CLR_TABLE_CUSTOM_CELLS_PROVIDER,
    TableCustomCellsProvider
} from '../table/table.component';
import { Table } from '../table/table.types';
import { HlcListElementType, HlcListKeysManagerService } from '../utils/list-keys-manager';
import { defaultListLabelsConfig, HLC_CLR_LIST_LABELS_CONFIG, ListLabelsConfig } from './list.config';
import { List } from './list.types';

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
        FilterService,
        HlcListKeysManagerService,
        HlcHotkeysContainerService
    ]
})
export class HlcClrListComponent implements TableCustomCellsProvider, AfterViewInit, OnDestroy {
    labelsConfig: ListLabelsConfig;
    private readonly destroy$ = new Subject();

    @Input() hideFilter = false;
    @Input() hidePaginator = false;
    @Input() disableSorting = false;

    @Input() isFilterShown = true;
    @Input() aggregateRow: Table.AggregateRow | undefined;
    @Input() selectedRows: any[];
    @Input() setFirstRowActiveOnFocus = true;
    @Input() rowSelectable = false;

    // Filter props delegator
    // @obsolete use definition.filters instead
    @Input() filterFields: ClrFormFields.FormField[];

    // Table props delegators

    @Input() loading = false;

    /**
     * Regular integration, just load data and keep them locally
     */
    @Input() dataProvider: Table.Data.DataProvider | undefined;
    // @obsolete, use definition
    @Input() table: Table.Definition | undefined;

    @Input() set definition(val: List.Definition | undefined) {
        this.table = val;
        if (val && val.filters) {
            this.filterFields = val.filters;
        } else {
            this.filterFields = (undefined as unknown) as ClrFormFields.FormField[];
        }
    }

    get definition(): List.Definition | undefined {
        return (this.table as unknown) as List.Definition | undefined;
    }

    /**
     * Enable darg & drop
     */
    @Input() dragEnabled = false;

    // tslint:disable-next-line:no-input-rename
    @Input('rowDetail') rowDetailInput: RowDetailDirective | undefined;

    /**
     * Row details template
     */
    //@ts-ignore
    @ContentChild(RowDetailDirective, { static: false }) rowDetailTemplate: RowDetailDirective | undefined;

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

    @Output() isFilterShownChange = new EventEmitter<boolean>();

    //@ts-ignore
    @ViewChild(HlcClrTableComponent, { static: false }) tableComponent: HlcClrTableComponent;

    constructor(
        private readonly elementRef: ElementRef,
        listKeysManager: HlcListKeysManagerService,
        private readonly hotkeysContainer: HlcHotkeysContainerService,
        private readonly filterService: FilterService,
        @Optional()
        @Inject(HLC_CLR_LIST_LABELS_CONFIG)
        labelsConfig?: ListLabelsConfig,
        @Optional()
        @SkipSelf()
        @Inject(HLC_CLR_TABLE_CUSTOM_CELLS_PROVIDER)
        private readonly containerCustomCellsProvider?: TableCustomCellsProvider
    ) {
        this.labelsConfig = labelsConfig || defaultListLabelsConfig;
        listKeysManager.focusedElement.pipe(takeUntil(this.destroy$)).subscribe(elType => {
            this.onSetFocusedElement(elType);
        });
    }

    setRows(rows: Table.Row[]) {
        this.tableComponent.rows = rows;
    }

    ngAfterViewInit() {
        if (!this.hasFilters) {
            // table will use filter service to get filter value and only then request reload so
            // setup filterService fake form here
            this.filterService.setForm(null);
            // If there is no filters on init, loading still should be dispatched with empty filter
            // this.setState({});
        }
        // Suppose here list is single focusable root component on the page
        this.hotkeysContainer.focus$.next(true);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.hotkeysContainer.destroy$.next();
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

    updateRow(row: Table.Row) {
        this.tableComponent.updateRow(row);
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
        this.isFilterShownChange.emit(this.isFilterShown);
    }

    get hasFilters() {
        return !!this.filterFields && this.filterFields.length > 0;
    }

    private onSetFocusedElement(elType: HlcListElementType) {
        if (elType === HlcListElementType.ActionBar) {
            return this.actionBarElement.focus();
        } else {
            return this.dataGridElement.focus();
        }
    }

    private get actionBarElement() {
        return this.nativeElement.querySelector('div.actionbar') as HTMLElement;
    }

    private get dataGridElement() {
        return this.nativeElement.querySelector('div.datagrid') as HTMLElement;
    }

    private get nativeElement() {
        return this.elementRef.nativeElement as HTMLElement;
    }
}
