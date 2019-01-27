import { Component, EventEmitter, forwardRef, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HlcClrDateComponent } from '../date/date.component';
import { RangeMapperService } from '../range.config';

export interface DateRangeValues {
    readonly?: boolean;
    format?: string;
}

@Component({
    selector: 'hlc-clr-date-range',
    templateUrl: './date-range.component.html',
    styleUrls: ['./date-range.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrDateRangeComponent),
            multi: true
        }
    ]
})
export class HlcClrDateRangeComponent implements OnInit, ControlValueAccessor, DateRangeValues {
    @Input()
    value: any | undefined | null;

    @Input()
    format: string | undefined;
    @Input()
    readonly: boolean;

    // required for reset
    @ViewChildren(HlcClrDateComponent)
    dateComponents: QueryList<HlcClrDateComponent>;

    @Output()
    valueChange = new EventEmitter<any | null | undefined>();

    propagateChange = (_: any) => {};

    constructor(private readonly rangeMapperService: RangeMapperService) {}

    ngOnInit() {}

    get dateFrom() {
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
        this.value = this.rangeMapperService.setRange([this.dateFrom, val]);
        this.onChange();
    }

    onChange() {
        this.valueChange.emit(this.value);
        this.propagateChange(this.value);
    }

    //

    writeValue(obj: any) {
        this.value = obj;
        if (!this.value && this.dateComponents) {
            this.dateComponents.forEach(x => x.resetValue());
        }
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}
}
