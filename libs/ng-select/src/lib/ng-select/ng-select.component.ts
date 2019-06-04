import {
    Component,
    EventEmitter,
    forwardRef,
    Inject,
    InjectionToken,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class HlcNgSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input() items?: any[];
    @Input() placeholder?: string;
    @Input() typeaheadFun?: (term$: Observable<string>) => Observable<any[]>;
    @Input() notFoundText?: string;
    @Input() bindValue?: string;
    @Input() bindLabel?: string;
    @Input() multiple = false;

    @Input() value: any;

    readonly typeahead$ = new Subject<string>();

    @Output()
    valueChange = new EventEmitter<any | null>();

    private readonly destroy$ = new Subject();

    private propagateChange = (_: any) => {};

    constructor(@Inject(HLC_NG_SELECT_CONFIG) @Optional() private readonly config: HlcNgSelectConfig) {}

    ngOnInit() {
        if (this.typeaheadFun) {
            this.typeaheadFun(this.typeahead$)
                .pipe(takeUntil(this.destroy$))
                .subscribe(items => {
                    this.items = items;
                });
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    get _bindValue() {
        return this.bindValue !== undefined ? this.bindValue : this.config && this.config.bindValue;
    }

    get _bindLabel() {
        return this.bindLabel !== undefined ? this.bindLabel : this.config && this.config.bindLabel;
    }

    onModelChange(val: string) {
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
