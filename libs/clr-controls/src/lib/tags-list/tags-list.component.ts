import { Component, Input, OnInit, Optional, Output, EventEmitter, Inject } from '@angular/core';
import { ListItemsConfig, ObjectMap, objectMap, LIST_ITEMS_CONFIG } from '../list-items.config';

@Component({
    selector: 'hlc-tags-list',
    templateUrl: './tags-list.component.html',
    styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
    @Input() items: any[];
    @Output() remove = new EventEmitter<any>();

    private readonly objMap: ObjectMap;

    constructor(
        @Optional()
        @Inject(LIST_ITEMS_CONFIG)
        config: ListItemsConfig | undefined
    ) {
        this.objMap = objectMap(config);
    }

    ngOnInit() {}

    onRemove(item: any) {
        this.remove.emit(item);
    }

    trackById(index: any, item: any) {
        return this.objMap.getKey(item, index);
    }

    getLabel(item: any) {
        return this.objMap.getLabel(item, item);
    }
}
