import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
    @Input() config: TypeaheadConfig;
    @Input() value: any[];
    @Input() readonly: boolean;
    propagateChange = (_: any) => {};

    constructor() {}

    onInput($event: any) {
        console.log('!!!', $event);
    }

    onValueChange(val: any) {
        this.value = val;
        this.propagateChange(this.value);
    }

    //

    writeValue(obj: any) {
        this.value = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}
}
