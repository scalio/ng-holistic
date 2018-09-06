import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Input,
    Optional,
    Inject,
    Output,
    EventEmitter
} from '@angular/core';
import {
    LIST_ITEMS_CONFIG,
    ListItemsConfig,
    ListItemsObjectMapper,
    listItemsDefaultObjectMapper
} from '../list-items.config';
import * as R from 'ramda';

@Component({
    selector: 'hlc-ordered-list',
    templateUrl: './ordered-list.component.html',
    styleUrls: ['./ordered-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderedListComponent implements OnInit {
    @Input() items: any[];
    @Output() itemsChange = new EventEmitter<any[]>();

    constructor(
        @Optional()
        @Inject(LIST_ITEMS_CONFIG)
        private readonly config: ListItemsConfig | undefined
    ) {}

    ngOnInit() {}

    onDragSuccess() {
        this.itemsChange.emit(this.items);
    }

    onCreate(text: string, item: any) {
        const itemIndex = this.items.indexOf(item);
        this.items = R.insert(itemIndex + 1, { key: text, label: text }, this.items);
        this.itemsChange.emit(this.items);
    }

    onRemove(index: number) {
        this.items = R.remove(index, 1, this.items);
        this.itemsChange.emit(this.items);
    }

    // list-items mapper

    private get mapper(): ListItemsObjectMapper {
        return (this.config && this.config.objectMapper) || listItemsDefaultObjectMapper;
    }

    mapKey(obj: any) {
        return this.mapper.mapKey(obj);
    }

    mapLabel(obj: any) {
        return this.mapper.mapLabel(obj);
    }

    //

    trackByFun = (_: number, item: any) => {
        return this.mapKey(item);
    };
}
