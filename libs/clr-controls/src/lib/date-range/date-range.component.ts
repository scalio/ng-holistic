import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RangeMapperService } from '../range.config';

export interface DateRangeValues {
    readonly?: boolean;
    format?: string;
}

@Component({
    selector: 'hlc-date-range',
    templateUrl: './date-range.component.html',
    styleUrls: ['./date-range.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateRangeComponent),
            multi: true
        }
    ]
})
export class DateRangeComponent implements OnInit, ControlValueAccessor, DateRangeValues {
    @Input()
    value: any | undefined | null;

    @Input()
    format: string | undefined;
    @Input()
    readonly: boolean;

    @ViewChild('input')
    input: ElementRef<any>;

    @Output()
    valueChange = new EventEmitter<any | null | undefined>();

    propagateChange = (_: any) => {};

    constructor(private readonly rangeMapperService: RangeMapperService) {}

    ngOnInit() {}

    get dateForm() {
        return this.value && this.rangeMapperService.getRange(this.value)[0];
    }

    get dateTo() {
        return this.value && this.rangeMapperService.getRange(this.value)[1];
    }

    onDateFromChange(val: any) {
        this.value = this.rangeMapperService.setRange([val, this.dateTo]);
        this.onChange();
    }

    onDateToChange(val: any) {
        this.value = this.rangeMapperService.setRange([this.dateForm, val]);
        this.onChange();
    }

    onChange() {
        this.valueChange.emit(this.value);
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
