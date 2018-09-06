import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Input,
    Optional,
    Inject,
    Output,
    EventEmitter,
    forwardRef
} from '@angular/core';
import {
    LIST_ITEMS_CONFIG,
    ListItemsConfig,
    ListItemsObjectMapper,
    listItemsDefaultObjectMapper
} from '../list-items.config';
import * as R from 'ramda';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'hlc-ordered-list',
    templateUrl: './ordered-list.component.html',
    styleUrls: ['./ordered-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OrderedListComponent),
            multi: true
        }
    ]
})
export class OrderedListComponent implements OnInit, ControlValueAccessor {

    @Input() items: any[];
    @Output() itemsChange = new EventEmitter<any[]>();
    propagateChange = (_: any) => {};

    constructor(
        @Optional()
        @Inject(LIST_ITEMS_CONFIG)
        private readonly config: ListItemsConfig | undefined
    ) {}

    ngOnInit() {}

    onDragSuccess() {
        this.onChange();
    }

    onCreate(text: string, item: any) {
        const itemIndex = this.items.indexOf(item);
        const newItem = {
            [this.mapper.keyField]: text,
            [this.mapper.labelField]: text
        };
        if (this.mapper.isNewField) {
            newItem[this.mapper.isNewField] = true as any;
        }
        this.items = R.insert(itemIndex + 1, newItem, this.items);
        this.onChange();
    }

    onRemove(index: number) {
        this.items = R.remove(index, 1, this.items);
        this.onChange();
    }

    onChange() {
        this.itemsChange.emit(this.items);
        this.propagateChange(this.items);
    }

    // list-items mapper

    private get mapper(): ListItemsObjectMapper {
        return (this.config && this.config.objectMapper) || listItemsDefaultObjectMapper;
    }

    mapKey(obj: any) {
        return obj[this.mapper.keyField];
    }

    mapLabel(obj: any) {
        return obj[this.mapper.labelField];
    }

    //
    trackByFun = (_: number, item: any) => {
        return this.mapKey(item);
    };

    //
    writeValue(obj: any) {
        this.items = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}

}
