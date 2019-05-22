import {
    Component,
    forwardRef,
    Input,
    OnInit,
    InjectionToken,
    Inject,
    Optional,
    Output,
    EventEmitter
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';

export interface HlcNgSelectConfig {
    bindValue: string;
    bindLabel: string;
}

export const HLC_NG_SELECT_CONFIG = new InjectionToken<HlcNgSelectConfig>('HLC_NG_SELECT_CONFIG');

@Component({
    selector: 'hlc-ng-select',
    templateUrl: './ng-select.component.html',
    styleUrls: ['./ng-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcNgSelectComponent),
            multi: true
        }
    ]
})
export class HlcNgSelectComponent implements OnInit, ControlValueAccessor {
    @Input() items?: any[];
    @Input() placeholder?: string;
    @Input() typeahead?: Subject<string>;

    @Input() value: any;

    @Output()
    valueChange = new EventEmitter<any | null>();

    propagateChange = (_: any) => {};

    constructor(@Inject(HLC_NG_SELECT_CONFIG) @Optional() private readonly config: HlcNgSelectConfig) {}

    ngOnInit() {}

    get bindValue() {
        return this.config && this.config.bindValue;
    }

    get bindLabel() {
        return this.config && this.config.bindLabel;
    }

    onModelChange(val: string) {
        console.log('+++', val);
        this.value = val;
        this.valueChange.emit(val);
        this.propagateChange(val);
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
