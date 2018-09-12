import { Component, forwardRef, Inject, Input, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { flatMap, tap, withLatestFrom } from 'rxjs/operators';
import { ListItemsConfig, LIST_ITEMS_CONFIG, ObjectMap, objectMap } from '../list-items.config';
import { TypeaheadConfig } from '../typeahead';

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
    value$ = new BehaviorSubject<any>([]);
    @Input()
    set value(val: any[]) {
        this.value$.next(val);
    }
    get value(): any[] {
        return this.value$.getValue();
    }
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

    private search = (term$: Observable<string>) => {
        return term$.pipe(
            tap(console.log),
            flatMap((this.config as TypeaheadConfig).search),
            withLatestFrom(this.value$, (items, val) => this.filterItems(val || [])(items))
        );
    };

    get _config() {
        if (!this.config) {
            return;
        }
        // modify default search, remove already selected tags
        return {
            ...this.config,
            search: this.search
        };
    }

    onChange($event: any) {
        this.value = [...(this.value || []), $event];
        console.log(this.value);
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
        return items.filter(item => !excl.some(i => this.objMap.getKey(i, i) === this.objMap.getKey(item, item)));
    };
}
