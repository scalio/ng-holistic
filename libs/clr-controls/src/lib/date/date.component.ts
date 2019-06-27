import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewChild,
    Inject,
    Optional
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getHours, getMinutes, setHours, setMinutes } from 'date-fns/esm/fp';
import * as R from 'ramda';
import { DateConvertService } from '../date-convert.service';
import { DATE_CONFIG, DateConfig } from '../date.config';

export interface DateValues {
    readonly?: boolean;
}

@Component({
    selector: 'hlc-clr-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrDateComponent),
            multi: true
        }
    ]
})
export class HlcClrDateComponent implements OnInit, OnInit, ControlValueAccessor, DateValues {
    @Input()
    value: string | undefined | null;

    @Input()
    format: string | undefined;
    @Input()
    readonly: boolean;

    //@ts-ignore
    @ViewChild('input', { static: false })
    input: ElementRef<any>;

    @Output()
    valueChange = new EventEmitter<string | null | undefined>();

    propagateChange = (_: any) => {};

    constructor(
        private readonly dateConvertService: DateConvertService,
        @Optional() @Inject(DATE_CONFIG) private readonly dateConfig?: DateConfig
    ) {}

    get date() {
        return this.value ? this.dateConvertService.parseDomainDate(this.value) : undefined;
    }

    set date(val: Date | undefined) {
        // control formatted val -> domain date
        this.value = !val
            ? null
            : R.pipe(
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

    get placeholder() {
        return this.dateConfig && this.dateConfig.placeholder;
    }

    ngOnInit() {}

    onReset() {
        this.value = undefined;
        this.onChange();
    }

    onChange() {
        this.valueChange.emit(this.value);
        this.propagateChange(this.value);
    }

    //

    writeValue(obj: any) {
        this.value = obj;
        if (!this.value) {
            this.resetValue();
        }
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}

    //
    resetValue() {
        if (this.input) {
            this.input.nativeElement.value = '';
        }
    }

    private formatToDomainStr = (date: Date) => this.dateConvertService.formatToDomainStr(date);
}
