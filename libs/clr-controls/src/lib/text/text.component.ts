import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNil } from 'ramda';

@Component({
    selector: 'hlc-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextComponent),
            multi: true
        }
    ]
})
export class TextComponent implements OnInit, ControlValueAccessor {
    @Input() value: string;

    @Input() placeholder: string;
    @Input() readonly: boolean;

    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    onChange($event: any) {
        this.propagateChange($event.target.value);
    }

    //

    writeValue(obj: any) {
        this.value = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}

    get cleanValue() {
        return isNil(this.value) ? '' : this.value;
    }
}
