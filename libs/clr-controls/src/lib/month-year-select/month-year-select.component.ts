import { DatePipe } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnChange } from 'property-watch-decorator';
import * as R from 'ramda';

export interface MonthYearSelectValue {
    month: number;
    year: number;
}

@Component({
    selector: 'hlc-month-year-select',
    templateUrl: './month-year-select.component.html',
    styleUrls: ['./month-year-select.component.scss'],
    providers: [
        DatePipe,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrMonthYearSelectComponent),
            multi: true
        }
    ]
})
export class HlcClrMonthYearSelectComponent implements OnInit, ControlValueAccessor {
    @Input() value: MonthYearSelectValue;

    @OnChange(HlcClrMonthYearSelectComponent.onYearChange)
    @Input()
    yearFrom?: number;

    @OnChange(HlcClrMonthYearSelectComponent.onYearChange)
    @Input()
    yearTo?: number;

    @Output()
    valueChange = new EventEmitter<MonthYearSelectValue>();

    years: { key: number; label: string }[];

    months: { key: number; label: string }[];

    private static onYearChange(it: HlcClrMonthYearSelectComponent) {
        const yfrom = it.yearFrom || 1960;
        const yto = it.yearTo || new Date().getFullYear();
        it.years = R.reverse(R.range(yfrom, yto + 1).map(key => ({ key, label: key.toString() })));
        it.months = R.range(0, 11).map(key => {
            const date = new Date().setMonth(key);
            return {
                key: key + 1,
                label: it.datePipe.transform(date, 'LLLL') as string
            };
        });
    }

    get yearValue() {
        return this.value && this.value.year;
    }

    get monthValue() {
        return this.value && this.value.month;
    }

    constructor(private readonly datePipe: DatePipe) {}

    ngOnInit() {
        HlcClrMonthYearSelectComponent.onYearChange(this);
    }

    onYearChange(year: number) {
        this.onValueChanged(R.assoc('year', year, this.value || {}));
    }

    onMonthChange(month: number) {
        this.onValueChanged(R.assoc('month', month, this.value || {}));
    }

    private onValueChanged(val: MonthYearSelectValue) {
        this.value = val;
        this.valueChange.emit(val);
        this.propagateChange(val);
    }

    //
    propagateChange = (_: any) => {};

    writeValue(obj: any) {
        this.value = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}
}
