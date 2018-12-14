import { Component, forwardRef, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { update } from 'ramda';
import { splitPhoneParts } from '@ng-holistic/clr-common';
import { TextMask } from '../mask/mask.utils';

@Component({
    selector: 'hlc-phone',
    templateUrl: './phone.component.html',
    styleUrls: ['./phone.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PhoneComponent),
            multi: true
        }
    ]
})
export class PhoneComponent implements OnInit, ControlValueAccessor {
    private codeJustFocused = false;
    private _value: string;
    private parts = ['', '', ''];

    @Input() set value(val: string) {
        this._value = val;
        const parts = this.value && splitPhoneParts(this.value);
        this.parts = parts || ['', '', this.value || ''];
    }

    get value() {
        return this._value;
    }

    @Input() placeholder: string | undefined;
    @Input() readonly: boolean | undefined;

    @ViewChild('numInput') numberInput: ElementRef<any>;
    @Output() valueChange = new EventEmitter<string>();

    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    get countryPart() {
        return this.parts[0];
    }

    get codePart() {
        return this.parts[1];
    }

    get numberPart() {
        return this.parts[2];
    }

    onCountryChange(val: string) {
        if (val === this.countryPart) {
            return;
        }
        this.parts = update(0, val || '', this.parts);
        this.onChange();
    }

    onCodeChange(val: string) {
        if (val === this.codePart) {
            return;
        }
        this.parts = update(1, val || '', this.parts);
        this.onChange();

        if (this.codeJustFocused) {
            this.codeJustFocused = false;
            return;
        }
        if (val && val.length === 3) {
            this.numberInput.nativeElement.focus();
        }
    }

    onNumberChange(val: string) {
        if (val === this.numberPart) {
            return;
        }
        const val1 = val && TextMask.unmaskStrNumber(val);
        this.parts = update(2, val1 || '', this.parts);
        this.onChange();
    }

    //
    onCodeFocus() {
        this.codeJustFocused = true;
    }

    //

    writeValue(obj: any) {
        this.value = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}

    private onChange() {
        this._value = this.parts.join('');
        this.valueChange.emit(this._value);
        this.propagateChange(this._value);
    }
}
