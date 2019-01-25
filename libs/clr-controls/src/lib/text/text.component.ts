import { Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNil } from 'ramda';

export interface TextValues {
    placeholder?: string;
    readonly?: boolean;
}

@Component({
    selector: 'hlc-clr-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrTextComponent),
            multi: true
        }
    ]
})
export class HlcClrTextComponent implements OnInit, ControlValueAccessor, TextValues {
    @Input() value: string;

    @Input() placeholder: string | undefined;
    @Input() readonly: boolean | undefined;

    @Output() valueChanged = new EventEmitter<string>();

    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    onChange($event: any) {
        this.value = $event.target.value;
        this.valueChanged.emit(this.value);
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
