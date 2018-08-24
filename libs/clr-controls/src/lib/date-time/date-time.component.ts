import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getHours, getMinutes, setHours, setMinutes } from 'date-fns/esm/fp';
import * as R from 'ramda';
import { DateConvertService } from '../date-convert.service';

// Fast and dirty implementation of date time input
// Original version should be available soon https://github.com/vmware/clarity/issues/474

interface ListItem {
    key: number;
    label: string;
}

@Component({
    selector: 'hlc-date-time',
    templateUrl: './date-time.component.html',
    styleUrls: ['./date-time.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateTimeComponent),
            multi: true
        }
    ]
})
export class DateTimeComponent implements OnInit, OnInit, ControlValueAccessor {
    @Input() value: string | undefined;
    @Input() format: string | undefined;

    @ViewChild('input') input: ElementRef<any>;

    @Output() valueChange = new EventEmitter<string | undefined>();

    readonly hours: ListItem[];
    readonly minutes: ListItem[];

    propagateChange = (_: any) => {};

    constructor(private readonly dateConvertService: DateConvertService) {
        this.hours = Array.from({ length: 24 }, (_, i) => ({
            key: i,
            label: i.toString().padStart(2, '0')
        }));
        this.minutes = Array.from({ length: 60 }, (_, i) => ({
            key: i,
            label: i.toString().padStart(2, '0')
        }));
    }

    get date() {
        return this.dateConvertService.parseDomainDate(this.value);
    }

    set date(val: Date | undefined) {
        if (!val) {
            return;
        }

        // control formatted val -> domain date
        this.value = R.pipe(
            // if perviouse value not empty take hours + minutes from there
            R.when(
                R.always(this.value) as any,
                R.pipe(
                    setHours(getHours(this.value)),
                    setMinutes(getMinutes(this.value))
                )
            ),
            this.formatToDomainStr
        )(val);

        this.onChange();
    }

    ngOnInit() {}

    onReset() {
        this.value = undefined;
        this.onChange();
        this.input.nativeElement.value = '';
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

    get hour() {
        return this.date ? getHours(this.date) : undefined;
    }

    get minute() {
        return this.date ? getMinutes(this.date) : undefined;
    }

    onHourChange(hour: number) {
        this.value = R.pipe(
            setHours(hour),
            // reset minutes if value still not defined
            R.when(R.always(!this.value), setMinutes(0)),
            this.formatToDomainStr
        )(this.date || new Date());

        this.onChange();
    }

    onMinuteChange(min: number) {
        this.value = R.pipe(
            setMinutes(min),
            // reset hours if value still not defined
            R.when(R.always(!this.value), setHours(0)),
            this.formatToDomainStr
        )(this.date || new Date());

        this.onChange();
    }

    private formatToDomainStr = (date: Date) => this.dateConvertService.formatToDomainStr(date);
}
