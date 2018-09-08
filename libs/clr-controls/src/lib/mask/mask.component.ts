import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'hlc-mask',
    templateUrl: './mask.component.html',
    styleUrls: ['./mask.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
