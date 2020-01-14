import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
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

    @Input() id: string;
    @Input() placeholder: string | undefined;
    @Input() readonly: boolean | undefined;
    @Input() maxLength: number | undefined;
    /**
     * Left characters from maxLength for applying waring style on displayed left chars text
     */
    @Input() warningLimit: number | undefined;

    @Output() valueChange = new EventEmitter<string>();

    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    onChange($event: any) {
        this.value = $event.target.value;
        this.valueChange.emit(this.value);
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

    get leftCounter() {
        return isNil(this.maxLength) ? null : this.maxLength - (isNil(this.value) ? 0 : this.value.length);
    }

    get counterStyle() {
        if (isNil(this.leftCounter)) {
            return null;
        } else if (this.leftCounter <= 0) {
            return 'text-counter-danger';
        } else if (
            !isNil(this.warningLimit) &&
            !isNil(this.maxLength) &&
            this.warningLimit >= this.leftCounter
        ) {
            return 'text-counter-warning';
        }
    }
}
