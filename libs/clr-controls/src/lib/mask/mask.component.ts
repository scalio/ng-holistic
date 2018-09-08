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

    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    onChange($event: any) {
        this.value = $event.target.value;
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
