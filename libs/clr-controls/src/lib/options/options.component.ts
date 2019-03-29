import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DictMapperService } from '../list-items.config';

export interface OptionsValues {
    items: any[];
    readonly?: boolean;
}

export const enum HlcClrOptionsViewType {
    Simple = 'simple',
    Buttons = 'buttons'
}

@Component({
    selector: 'hlc-clr-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrOptionsComponent),
            multi: true
        }
    ]
})
export class HlcClrOptionsComponent implements OnInit, ControlValueAccessor, OptionsValues {
    @Input()
    viewType = HlcClrOptionsViewType.Simple;
    @Input()
    items: any[];
    @Input()
    value: string | undefined;
    @Input()
    readonly: boolean;
    @Output()
    valueChange = new EventEmitter<string | undefined>();
    propagateChange = (_: any) => {};

    constructor(private readonly dictMapper: DictMapperService) {}

    ngOnInit() {}

    onChange(val: any) {
        this.value = val || null;
        this.valueChange.emit(this.value);
        this.propagateChange(this.value);
    }

    isChecked(item: any) {
        return this.mapKey(item) === this.value;
    }

    mapKey(obj: any) {
        return this.dictMapper.getKey(obj);
    }

    mapLabel(obj: any) {
        return this.dictMapper.getLabel(obj);
    }

    trackBy = (_: number, obj: any) => {
        return this.mapKey(obj);
    };

    //

    writeValue(obj: any) {
        this.value = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}
}
