import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'hlc-mask',
    templateUrl: './mask.component.html',
    styleUrls: ['./mask.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MaskComponent),
            multi: true
        }
    ]
})
export class MaskComponent implements OnInit, ControlValueAccessor {
    @Input() value: string;

    @Input() mask: string;
    @Input() unmask: ((val: string) => any) | undefined;
    @Input() readonly: boolean;

    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    onChange($event: any) {
        if (($event.target.value || '') === (this.value || '')) {
            return;
        }
        this.value = $event.target.value;
        const val = this.unmask ? this.unmask(this.value) : this.value;
        this.propagateChange(val);
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
