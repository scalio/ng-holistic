import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Small wrapper around https://github.com/KillerCodeMonkey/ngx-quill
 *
 */

@Component({
    selector: 'hlc-rich-text',
    templateUrl: './rich-text.component.html',
    styleUrls: ['./rich-text.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrRichTextComponent),
            multi: true
        }
    ]
})
export class HlcClrRichTextComponent implements OnInit, ControlValueAccessor {
    @Input() placeholder: string;

    @Input()
    value: string | undefined;

    @Input()
    readonly: boolean;

    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    onModelChange(event: any) {
        this.value = event;
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
