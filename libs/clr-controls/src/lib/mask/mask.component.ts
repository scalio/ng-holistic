import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Mask } from './mask.types';

@Component({
    selector: 'hlc-mask',
    templateUrl: './mask.component.html',
    styleUrls: ['./mask.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MaskComponent),
            multi: true,
        },
    ],
})
export class MaskComponent implements OnInit, ControlValueAccessor {
    @Input()
    value: string;

    @Input() placeholder: string;

    @Input() mask: Mask.MaskValue;
    @Input() unmask: Mask.UnmaskFun;

    @Output()
    valueChange = new EventEmitter<string>();

    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    get textMask() {
        // mask could be set in 2 formats: one full defined mask options and another just mask template string
        // convert all of them to full format here
        return this.mask && ((this.mask as any)['mask'] ? this.mask : { mask: this.mask, guide: false });
    }

    onChange($event: any) {
        if (($event.target.value || '') === (this.value || '')) {
            return;
        }
        this.value = $event.target.value;
        const val = this.unmask ? this.unmask(this.value) : this.value;
        this.propagateChange(val);
        this.valueChange.emit(val);
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
