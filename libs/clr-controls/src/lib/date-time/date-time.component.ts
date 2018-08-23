import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    InjectionToken,
    Input,
    OnInit,
    Optional,
    Output,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as R from 'ramda';
import { format as formatDate, getHours, getMinutes, parse as parseDate, setHours, setMinutes } from 'date-fns/esm/fp';

// Fast and dirty implementation of date time input
// Original version should be available soon https://github.com/vmware/clarity/issues/474

export interface DateTimeConfig {
    format?: string;
}

export const DATE_TIME_CONFIG = new InjectionToken('DATE_TIME_CONFIG');

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

    constructor(
        @Optional()
        @Inject(DATE_TIME_CONFIG)
        private readonly config: DateTimeConfig | undefined
    ) {
        this.hours = Array.from({ length: 24 }, (v, i) => ({
            key: i,
            label: i.toString().padStart(2, '0')
        }));
        this.minutes = Array.from({ length: 60 }, (m, i) => ({
            key: i,
            label: i.toString().padStart(2, '0')
        }));
    }

    private get dateTimeFormat() {
        if (this.format) {
            return this.format;
        }
        if (this.config && this.config.format) {
            return this.config.format;
        }
        // tslint:disable-next-line:quotemark
        return "yyyy-MM-dd'T'HH:mm:ss.SSSZ";
    }

    get date() {
        const x = parseDate(new Date(), this.dateTimeFormat, this.value);
        return this.value ? x : undefined;
    }

    set date(val: Date | undefined) {
        if (!val) {
            return;
        }

        this.value = R.pipe(
            // if perviouse value not empty take hours + minutes from there
            R.when(
                R.always(this.value) as any,
                R.pipe(
                    setHours(getHours(this.value)),
                    setMinutes(getMinutes(this.value))
                )
            ),
            // convert to correct format
            formatDate(this.dateTimeFormat)
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

    registerOnTouched(fn: any) {}

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
            formatDate(this.dateTimeFormat)
        )(this.date || new Date());

        this.onChange();
    }

    onMinuteChange(min: number) {
        this.value = R.pipe(
            setMinutes(min),
            // reset hours if value still not defined
            R.when(R.always(!this.value), setHours(0)),
            formatDate(this.dateTimeFormat)
        )(this.date || new Date());

        this.onChange();
    }
}
