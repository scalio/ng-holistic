import {
    Component,
    OnInit,
    Optional,
    InjectionToken,
    Inject,
    Input,
    Output,
    EventEmitter,
    forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface SelectObjectMapper {
    mapKey: (obj: any) => string;
    mapLabel: (obj: any) => string;
}

const selectDefaultObjectMapper: SelectObjectMapper = {
    mapKey(obj) {
        return obj['key'];
    },

    mapLabel(obj) {
        return obj['label'];
    }
};

export interface SelectConfig {
    objectMapper?: SelectObjectMapper;
}

export const SELECT_CONFIG = new InjectionToken('SELECT_CONFIG');

@Component({
    selector: 'hlc-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent implements OnInit, OnInit, ControlValueAccessor {
    @Input() items: any[];
    @Input() value: any | undefined;
    // true - Don't wrap to 'select' class container, use original browser look
    @Input() naked: boolean | undefined;
    // true - Don't generate empty list item
    @Input() disallowEmpty: boolean | undefined;
    @Output() valueChange = new EventEmitter<string | undefined>();
    propagateChange = (_: any) => {};

    constructor(
        @Optional()
        @Inject(SELECT_CONFIG)
        private readonly config: SelectConfig | undefined
    ) {}

    ngOnInit() {}

    onChange(val: any) {
        this.value = val.target.value;
        this.valueChange.emit(this.value);
        this.propagateChange(this.value);
    }

    private get mapper(): SelectObjectMapper {
        return (this.config && this.config.objectMapper) || selectDefaultObjectMapper;
    }

    mapKey(obj: any) {
        return this.mapper.mapKey(obj);
    }

    mapLabel(obj: any) {
        return this.mapper.mapLabel(obj);
    }

    trackBy = (i: number, obj: any) => {
        return this.mapKey(obj);
    };

    //

    writeValue(obj: any) {
        this.value = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) {}
}
