import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'hlc-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleComponent),
            multi: true
        }
    ]
})
export class ToggleComponent implements OnInit, ControlValueAccessor {
    private static togglesCount = 0;

    id: string;
    @Input() text: string;
    @Input() value: boolean;
    @Input() readonly: boolean | undefined;

    propagateChange = (_: any) => {};

    constructor() {
        this.id = `toggle_${ToggleComponent.togglesCount}`;
        ToggleComponent.togglesCount++;
    }

    ngOnInit() {}

    onChange(val: any) {
        this.value = val;
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
