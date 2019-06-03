import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SearchArg } from '@ng-holistic/typeahead';
import { Observable } from 'rxjs';
import { TypeaheadMapper, TypeaheadMapperService } from './typeahead-mapper.service';

export interface TypeaheadObjectMap {
    key: string;
    label: string;
    description: string;
}

export interface TypeaheadConfig {
    search: (text: Observable<SearchArg>) => Observable<any[]>;
    mapper?: TypeaheadMapper;
}

@Component({
    selector: 'hlc-clr-typeahead',
    templateUrl: './typeahead.component.html',
    styleUrls: ['./typeahead.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrTypeaheadComponent),
            multi: true
        }
    ]
})
export class HlcClrTypeaheadComponent implements OnInit, ControlValueAccessor {
    @Input()
    value: any;
    @Input()
    config: TypeaheadConfig | undefined;
    @Input()
    readonly: boolean | undefined;
    @Input()
    placeholder: string;
    @Input()
    allowAddNew: boolean;

    @Output()
    valueChange = new EventEmitter<any>();

    @Output()
    addNew = new EventEmitter<string>();

    //@ts-ignore
    @ViewChild('input', { static: false })
    input: any;

    propagateChange = (_: any) => {};

    constructor(private readonly mapper: TypeaheadMapperService) {}

    ngOnInit() {}

    getKey(obj: any) {
        return this.config && this.config.mapper ? this.config.mapper.getKey(obj) : this.mapper.getKey(obj);
    }

    getLabel = (obj: any) => {
        return this.config && this.config.mapper ? obj[this.config.mapper.getLabel(obj)] : this.mapper.getLabel(obj);
    };

    getDescription(obj: any) {
        return this.config && this.config.mapper && this.config.mapper.getDescription
            ? this.config.mapper.getDescription(obj)
            : this.mapper.getDescription
            ? this.mapper.getDescription(obj)
            : null;
    }

    get search() {
        return this.config && this.config.search;
    }

    onChange($event: any) {
        this.value = $event;
        this.propagateChange(this.value);
        this.valueChange.emit(this.value);
    }

    resetValue() {
        this.value = undefined;
        this.input.nativeElement.value = '';
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
