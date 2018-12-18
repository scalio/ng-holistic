import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { isNil } from 'ramda';

@Component({
    selector: 'hlc-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordComponent implements OnInit, ControlValueAccessor {
    @Input() value: string;

    @Input() placeholder: string | undefined;
    @Input() readonly: boolean | undefined;

    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    onChange($event: any) {
        this.value = $event.target.value;
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
