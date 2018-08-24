import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ContentChild,
    TemplateRef
} from '@angular/core';
import { TableConfig, CellClickEvent } from '../list-table';
import { List } from '@ng-holistic/lists';

@Component({
    selector: 'hlc-list-layout',
    templateUrl: './list-layout.component.html',
    styleUrls: ['./list-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListLayoutComponent implements OnInit {
    @Input() tableConfig: TableConfig | undefined;
    @Input() paginator: List.Paginator;
    @Input() items: any[];
    @Input() loading: boolean;
    @Input() selected: string[];
    @Input() activeItemId: string[];

    @ContentChild('cell') cellTemplate: TemplateRef<any>;
    @ContentChild('rowDetail') rowDetailTemplate: TemplateRef<any>;

    @Output() refresh = new EventEmitter<List.SearchParams>();
    @Output() cellClick = new EventEmitter<CellClickEvent>();
    @Output() selectedChange = new EventEmitter<any[]>();

    constructor() {}

    ngOnInit() {}

    onRefresh(prms: List.SearchParams) {
        this.refresh.emit(prms);
    }

}
