import { Component, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cleanupTypeaheadValue, SearchArg } from '@ng-holistic/typeahead';
import * as R from 'ramda';
import { BehaviorSubject, Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { DictMapperService } from '../list-items.config';
import { HlcClrTypeaheadComponent, TypeaheadConfig } from '../typeahead/typeahead.component';

@Component({
    selector: 'hlc-clr-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrTagsComponent),
            multi: true
        }
    ]
})
export class HlcClrTagsComponent implements ControlValueAccessor {
    value$ = new BehaviorSubject<any>([]);
    @Input()
    set value(val: any[]) {
        this.value$.next(val);
    }
    get value(): any[] {
        return this.value$.getValue();
    }
    @Input()
    config: TypeaheadConfig | undefined;
    @Input()
    readonly: boolean | undefined;
    @Input()
    allowAddNew: boolean;
    @Input()
    placeholder: string | undefined;
    @Input()
    showSorted: boolean | ((item: any) => R.Ord) = true;

    @Output()
    addNew = new EventEmitter<string>();

    @ViewChild(HlcClrTypeaheadComponent)
    typeahead: HlcClrTypeaheadComponent;

    propagateChange = (_: any) => {};

    constructor(private readonly dictMapper: DictMapperService) {}

    private search = (args$: Observable<SearchArg>) => {
        return (this.config as TypeaheadConfig)
            .search(args$)
            .pipe(withLatestFrom(this.value$, (items, val) => this.filterItems(val || [])(items as any)));
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
        this.typeahead.resetValue();
        this.propagateChange(this.value);
    }

    onRemove(item: any) {
        this.value = this.filterItem(item, this.value);
        this.propagateChange(this.value);
    }

    onAddNew(text: string) {
        this.value = [...(this.value || []), text];
        this.typeahead.resetValue();
        this.propagateChange(this.value);
        this.addNew.emit(text);
    }

    //
    get sortedValue() {
        const sort = R.is(Function, this.showSorted) ? this.showSorted : this.dictMapper.getLabel.bind(this.dictMapper);
        return this.value && R.sortBy(sort, this.value);
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
        return items.filter(i => this.dictMapper.getKey(i) !== this.dictMapper.getKey(item));
    }

    private filterItems = (excl: any[]) => (items: any[]) => {
        return items.filter(item => {
            item = cleanupTypeaheadValue(item);
            return !excl.some(i => this.dictMapper.getKey(i) === this.dictMapper.getKey(item));
        });
    };
}
