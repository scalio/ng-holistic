import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    @Input() readonly: any[];
    propagateChange = (_: any) => {};

    constructor() {}

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
