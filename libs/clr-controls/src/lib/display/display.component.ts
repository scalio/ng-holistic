import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'hlc-clr-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrDisplayComponent),
            multi: true
        }
    ]
})
export class HlcClrDisplayComponent {
    @Input() value: any;
    @Input() format: (val: any) => string;

    @Input() icon: string;
    @Input() iconTooltipText: string;

    @Output() iconClick = new EventEmitter();

    //
    writeValue(obj: any) {
        this.value = obj;
    }

    registerOnChange(_: any) {}

    registerOnTouched(_: any) {}

    get formattedValue() {
        return this.format ? this.format(this.value) : this.value;
    }
}
