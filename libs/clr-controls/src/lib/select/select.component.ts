import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNil } from 'ramda';
import { DictMapper, DictMapperService } from '../list-items.config';

@Component({
    selector: 'hlc-clr-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrSelectComponent),
            multi: true
        }
    ]
})
export class HlcClrSelectComponent implements OnInit, OnInit, ControlValueAccessor {
    _items: any[] | undefined;
    _value: any | undefined;
    /**
     * This value has temp val in case in items there is no item for the real value.
     * Items provided after value case.
     */
    _tmpValue: any | undefined;

    @Input()
    set items(items: any[] | undefined) {
        this._items = items;
        if (!isNil(this._tmpValue)) {
            this.setValue(this._tmpValue);
        }
    }

    get items() {
        return this._items;
    }

    @Input()
    set value(val: any | null) {
        this.setValue(val);
    }

    get value() {
        return this._tmpValue || this._value;
    }

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
    valueChanged = new EventEmitter<any | undefined>();
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

        this.value = selectedIndex === -1 ? null : this.mapKey((this.items || [])[selectedIndex]);
        this.propagateChange(this.value);
        this.valueChanged.emit(this.value);
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

    setValue(val: any | null) {
        if (isNil(val)) {
            this._tmpValue = null;
            this._value = null;
            return;
        }
        const hasItem = (this.items || []).some(i => this.mapKey(i) === val);
        if (hasItem) {
            this._tmpValue = null;
            this._value = val;
        } else {
            this._tmpValue = val;
            this._value = null;
        }
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
