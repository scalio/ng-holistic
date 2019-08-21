import { Component, EventEmitter, forwardRef, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getHours, getMinutes, setHours, setMinutes } from 'date-fns/esm/fp';
import * as R from 'ramda';
import { DateConvertService } from '../date-convert.service';
import { DateConfig, DATE_CONFIG } from '../date.config';
import { DictMapperService } from '../list-items.config';

export interface DateTimeValues {
    readonly?: boolean;
}

@Component({
    selector: 'hlc-clr-date-time',
    templateUrl: './date-time.component.html',
    styleUrls: ['./date-time.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrDateTimeComponent),
            multi: true
        }
    ]
})
export class HlcClrDateTimeComponent implements OnInit, OnInit, ControlValueAccessor, DateTimeValues {
    readonly hours: any[];
    readonly minutes: any[];

    @Input()
    value: string | undefined | null;

    @Input()
    format: string | undefined;
    @Input()
    readonly: boolean;

    @Output()
    valueChange = new EventEmitter<string | null | undefined>();

    propagateChange = (_: any) => {};

    constructor(
        private readonly dateConvertService: DateConvertService,
        @Optional() @Inject(DATE_CONFIG) private readonly dateConfig?: DateConfig
    ) {
        this.hours = Array.from({ length: 24 }, (_, i) => ({
            key: i,
            label: i.toString().padStart(2, '0')
        }));
        this.minutes = Array.from({ length: 60 }, (_, i) => ({
            key: i,
            label: i.toString().padStart(2, '0')
        }));
    }

    get dictMapper() {
        return new DictMapperService();
    }

    get date() {
        return this.dateConvertService.parseDomainDate(this.value);
    }

    set date(val: Date | undefined) {
        // control formatted val -> domain date
        this.value = !val
            ? null
            : R.pipe(
                  // if pervious value not empty take hours + minutes from there
                  R.when(
                      R.always(this.value) as any,
                      R.pipe(
                          setHours(getHours(this.value as any)),
                          setMinutes(getMinutes(this.value as any))
                      )
                  ),
                  this.formatToDomainStr
              )(val);

        this.onChange();
    }

    get placeholder() {
        return this.dateConfig && this.dateConfig.placeholder;
    }

    ngOnInit() {}

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

    //

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

    //
    private formatToDomainStr = (date: Date) => this.dateConvertService.formatToDomainStr(date);
}
