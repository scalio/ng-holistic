import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as R from 'ramda';
import { DictMapper, DictMapperService } from '../list-items.config';

@Component({
    selector: 'hlc-clr-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrMultiSelectComponent),
            multi: true
        }
    ]
})
export class HlcClrMultiSelectComponent implements OnInit, OnInit, ControlValueAccessor {
    @Input()
    items: any[];
    @Input()
    value: any[] | undefined;
    @Input()
    dictMapper: DictMapper | undefined;
    @Output()
    valueChange = new EventEmitter<any[] | undefined>();
    propagateChange = (_: any) => {};

    constructor(private readonly dictMapperService: DictMapperService) {}

    ngOnInit() {}

    onChange(val: any) {
        this.value = Array.apply(null, val.target.options)
            .map((opt: any, i: number) => [opt, i])
            .filter(([opt]: [any]) => opt.selected)
            .map(([_, i]: [any, any]) => this.mapKey(this.items[i]));
        this.valueChange.emit(this.value);
        this.propagateChange(this.value);
    }

    isSelected(item: any) {
        const isSelected = R.contains(this.mapKey(item), this.value || []);
        return isSelected;
    }

    mapKey(obj: any) {
        return (this.dictMapper || this.dictMapperService).getKey(obj);
    }

    mapLabel(obj: any) {
        return (this.dictMapper || this.dictMapperService).getLabel(obj);
    }

    trackBy = (_: any, obj: any) => {
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
