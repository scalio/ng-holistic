import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnInit,
    Optional,
    Output,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { defaultPhoneConfig, HLC_CLR_PHONE_CONFIG, PhoneConfig } from './phone.config';

@Component({
    selector: 'hlc-clr-phone',
    templateUrl: './phone.component.html',
    styleUrls: ['./phone.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrPhoneComponent),
            multi: true
        }
    ]
})
export class HlcClrPhoneComponent implements OnInit, ControlValueAccessor {
    private codeJustFocused = false;

    private readonly config: PhoneConfig;

    @Input() value: any;
    @Input() placeholder: string | undefined;
    @Input() readonly: boolean | undefined;

    @ViewChild('numInput') numberInput: ElementRef<any>;
    @Output() valueChange = new EventEmitter<string>();

    propagateChange = (_: any) => {};

    constructor(@Optional() @Inject(HLC_CLR_PHONE_CONFIG) config?: PhoneConfig) {
        this.config = config || defaultPhoneConfig;
    }

    ngOnInit() {}

    get useCodePart() {
        return this.config.useParts === 'CountryCodeNumber';
    }

    get countryPart() {
        return this.config.getCountry(this.value);
    }

    get codePart() {
        return this.config.getCode && this.config.getCode(this.value);
    }

    get numberPart() {
        return this.config.getNumber(this.value);
    }

    onCountryChange(val: string) {
        if (val === this.countryPart) {
            return;
        }
        this.value = this.config.concatValue(val, this.codePart, this.numberPart);
        this.onChange();
    }

    onCodeChange(val: string) {
        if (val === this.codePart) {
            return;
        }
        this.value = this.config.concatValue(this.countryPart, val, this.numberPart);
        this.onChange();

        if (this.codeJustFocused) {
            this.codeJustFocused = false;
            return;
        }
        if (val && val.length === 3) {
            this.numberInput.nativeElement.focus();
        }
    }

    onNumberChange(val: string) {
        if (val === this.numberPart) {
            return;
        }
        this.value = this.config.concatValue(this.countryPart, this.codePart, val);
        this.onChange();
    }

    //
    onCodeFocus() {
        this.codeJustFocused = true;
    }

    //

    writeValue(obj: any) {
        this.value = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}

    private onChange() {
        this.valueChange.emit(this.value);
        this.propagateChange(this.value);
    }
}
