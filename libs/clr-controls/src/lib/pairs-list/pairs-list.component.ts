import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as R from 'ramda';
import { DictMapperService, DictMapperSetterService } from '../list-items.config';

@Component({
    selector: 'hlc-clr-pairs-list',
    templateUrl: './pairs-list.component.html',
    styleUrls: ['./pairs-list.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrPairsListComponent),
            multi: true
        }
    ]
})
export class HlcClrPairsListComponent implements OnInit, ControlValueAccessor {
    @Input()
    value: any[] | undefined;
    @Input()
    readonly: boolean;
    @Output()
    valueChange = new EventEmitter<string[] | undefined>();
    propagateChange = (_: any) => {};

    constructor(
        private readonly dictMapper: DictMapperService,
        private readonly dictMapperSetter: DictMapperSetterService
    ) {}

    ngOnInit() {}

    onChangeKey(itemIndex: number, key: string) {
        const value = this.value || [];
        // this.dictMapperSetter.setKey(value[itemIndex], key);
        this.value = R.update(itemIndex, this.dictMapperSetter.setKey(value[itemIndex], key), value);
        this.valueChange.emit(this.value);
        this.propagateChange(this.value);
    }

    onChangeValue(itemIndex: number, label: string) {
        const value = this.value || [];
        // this.dictMapperSetter.setLabel(value[itemIndex], label);
        this.value = R.update(itemIndex, this.dictMapperSetter.setLabel(value[itemIndex], label), value);
        this.valueChange.emit(this.value);
        this.propagateChange(this.value);
    }

    onRemove(itemIndex: number) {
        const value = this.value || [];
        this.value = R.remove(itemIndex, 1, value);
        this.valueChange.emit(this.value);
        this.propagateChange(this.value);
    }

    onAdd() {
        const value = this.value || [];
        const item = R.pipe(
            (i: any) => this.dictMapperSetter.setKey(i, ''),
            (i: any) => this.dictMapperSetter.setLabel(i, '')
        )({});
        this.value = R.insert(0, item, value);
        this.valueChange.emit(this.value);
        this.propagateChange(this.value);
    }

    mapKey(obj: any) {
        return this.dictMapper.getKey(obj);
    }

    mapLabel(obj: any) {
        return this.dictMapper.getLabel(obj);
    }

    trackBy = (i: number) => {
        return i;
    };

    //

    writeValue(obj: any[]) {
        this.value = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}
}
