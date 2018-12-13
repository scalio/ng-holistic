import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DictMapperService, DictMapper } from '../list-items.config';

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
    @Input()
    dictMapper: DictMapper | undefined;
    @Output()
    valueChange = new EventEmitter<string | undefined>();
    propagateChange = (_: any) => {};

    constructor(private readonly dictMapperService: DictMapperService) {}

    ngOnInit() {}

    onChange(val: any) {
        /**
        * Option change event always give string as an option value, event if value actually was other object type,
        * this is wrong obviously when key is number.
        * So use selectedIndex instead of val.target.value
        */
        const selectedIndex = val.target.selectedIndex - (this.disallowEmpty ? 0 : 1);

        this.value = selectedIndex === -1 ? null : this.mapKey(this.items[selectedIndex]);
        this.valueChange.emit(this.value);
        this.propagateChange(this.value);
    }

    mapKey(obj: any) {
        return (this.dictMapper || this.dictMapperService).getKey(obj);
    }

    mapLabel(obj: any) {
        return (this.dictMapper || this.dictMapperService).getLabel(obj);
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
