import { Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'hlc-clr-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrToggleComponent),
            multi: true
        }
    ]
})
export class HlcClrToggleComponent implements OnInit, ControlValueAccessor {
    private static togglesCount = 0;

    id: string;
    @Input() text: string;
    @Input() value: boolean;
    @Input() readonly: boolean | undefined;
    @Output() valueChanged = new EventEmitter<boolean>();

    propagateChange = (_: any) => {};

    constructor() {
        this.id = `toggle_${HlcClrToggleComponent.togglesCount}`;
        HlcClrToggleComponent.togglesCount++;
    }

    ngOnInit() {}

    onChange(val: any) {
        this.value = val;
        this.propagateChange(val);
        this.valueChanged.emit(val);
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
