import { Component, forwardRef, Input, Optional, Inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TypeaheadConfig } from '../typeahead';
import { ObjectMap, LIST_ITEMS_CONFIG, ListItemsConfig, objectMap } from '../list-items.config';
import { map } from 'rxjs/operators';

@Component({
    selector: 'hlc-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TagsComponent),
            multi: true
        }
    ]
})
export class TagsComponent implements ControlValueAccessor {
    @Input() value: any[];
    @Input() config: TypeaheadConfig | undefined;
    @Input() readonly: boolean | undefined;

    private readonly objMap: ObjectMap;

    propagateChange = (_: any) => {};

    constructor(
        @Optional()
        @Inject(LIST_ITEMS_CONFIG)
        config: ListItemsConfig | undefined
    ) {
        this.objMap = objectMap(config);
    }

    get search() {
        return this.config
            ? // filter already selected items
              (term: any) => {
                  console.log('111', term);
                  return (this.config as TypeaheadConfig).search(term).pipe(map(this.filterItems(this.value || [])));
              }
            : undefined;
    }

    onChange($event: any) {
        this.value = [$event, ...(this.value || [])];
    }

    onRemove(item: any) {
        this.value = this.filterItem(item, this.value);
    }
    //

    writeValue(obj: any) {
        this.value = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}

    //
    private filterItem(item: any, items: any[]) {
        return items.filter(i => this.objMap.getKey(i, i) !== this.objMap.getKey(item, item));
    }

    private filterItems = (excl: any[]) => (items: any[]) => {
        return items.filter(item => !excl.some(i => this.objMap.getKey(i, i) !== this.objMap.getKey(item, item)));
    };
}
