import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNil } from 'ramda';

export interface TextAreaValues {
    placeholder?: string;
    readonly?: boolean;
}

@Component({
    selector: 'hlc-clr-text-area',
    templateUrl: './text-area.component.html',
    styleUrls: ['./text-area.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrTextAreaComponent),
            multi: true
        }
    ]
})
export class HlcClrTextAreaComponent implements OnInit, ControlValueAccessor, TextAreaValues {
    @Input() value: string;

    @Input() placeholder: string;
    @Input() readonly: boolean;

    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    onChange($event: any) {
        if (this.value === undefined && !$event.target.value) {
            // when user set first time focus on empty field don't change null -> ''.
            // Behaviour consistent with text component.
            return;
        }
        this.value = $event.target.value;
        this.propagateChange($event.target.value);
    }

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
