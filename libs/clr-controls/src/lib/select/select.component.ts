import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DictMapperService } from '../list-items.config';

export interface SelectValues {
    items: any[];
    disallowEmpty?: boolean;
    readonly?: boolean;
}

@Component({
    selector: 'hlc-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent implements OnInit, OnInit, ControlValueAccessor, SelectValues {
    @Input()
    items: any[];
    @Input()
    value: any | undefined;
    // true - Don't wrap to 'select' class container, use original browser look
    @Input()
    naked: boolean | undefined;
    // true - Don't generate empty list item
    @Input()
    disallowEmpty: boolean | undefined;
    @Input()
    readonly: boolean;
    @Output()
    valueChange = new EventEmitter<string | undefined>();
    propagateChange = (_: any) => {};

    constructor(private readonly dictMapper: DictMapperService) {}

    ngOnInit() {}

    onChange(val: any) {
        this.value = val.target.value || null;
        this.valueChange.emit(this.value);
        this.propagateChange(this.value);
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
