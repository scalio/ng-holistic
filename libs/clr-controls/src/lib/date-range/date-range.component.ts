import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isEmpty } from 'ramda';
import { DateConvertService } from '../date-convert.service';

export interface DateRange {
    from?: string;
    to?: string;
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
export class DateRangeComponent implements ControlValueAccessor, OnInit {
    @Input() format: string | undefined;
    @Input() value: DateRange | undefined;

    propagateChange = (_: any) => {};

    constructor(private readonly dateConvert: DateConvertService) {}

    ngOnInit() {}

    get dateFrom() {
        return this.dateConvert.format(this.value && this.value.from);
    }

    get dateTo() {
        return this.dateConvert.format(this.value && this.value.to);
    }

    onDateFromChange(val: string) {
        const from = this.dateConvert.convert(val);
        this.onChange({ ...(this.value || {}), from });
    }

    onDateToChange(val: string) {
        const to = this.dateConvert.convert(val);
        this.onChange({ ...(this.value || {}), to });
    }

    //

    writeValue(obj: DateRange | undefined) {
        this.value = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}

    //

    private onChange(val: DateRange | undefined) {
        val = isEmpty(val) ? undefined : val;
        this.writeValue(val);
        this.propagateChange(val);
    }
}
