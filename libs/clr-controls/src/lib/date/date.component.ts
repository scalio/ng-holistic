import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getHours, getMinutes, setHours, setMinutes } from 'date-fns/esm/fp';
import * as R from 'ramda';
import { DateConvertService } from '../date-convert.service';

export interface DateValues {
    readonly?: boolean;
}

@Component({
    selector: 'hlc-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateComponent),
            multi: true
        }
    ]
})
export class DateComponent implements OnInit, OnInit, ControlValueAccessor, DateValues {
    @Input()
    value: string | undefined;

    @Input()
    format: string | undefined;
    @Input()
    readonly: boolean;

    @ViewChild('input')
    input: ElementRef<any>;

    @Output()
    valueChange = new EventEmitter<string | undefined>();

    propagateChange = (_: any) => {};

    constructor(private readonly dateConvertService: DateConvertService) {}

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

    //

    private formatToDomainStr = (date: Date) => this.dateConvertService.formatToDomainStr(date);
}
