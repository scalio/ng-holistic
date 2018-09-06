import { ChangeDetectionStrategy, Component, OnInit, Input, Optional, Inject } from '@angular/core';
import {
    LIST_ITEMS_CONFIG,
    ListItemsConfig,
    ListItemsObjectMapper,
    listItemsDefaultObjectMapper
} from '../list-items.config';

@Component({
    selector: 'hlc-ordered-list',
    templateUrl: './ordered-list.component.html',
    styleUrls: ['./ordered-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderedListComponent implements OnInit {
    @Input() items: any[];

    constructor(
        @Optional()
        @Inject(LIST_ITEMS_CONFIG)
        private readonly config: ListItemsConfig | undefined
    ) {}

    ngOnInit() {
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
    }
}
