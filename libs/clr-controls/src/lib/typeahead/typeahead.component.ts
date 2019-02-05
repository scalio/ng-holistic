import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchArg } from '@ng-holistic/typeahead';

export interface TypeaheadObjectMap {
    key: string;
    label: string;
    description: string;
}

export interface TypeaheadConfig {
    search: (text: Observable<SearchArg>) => Observable<any[]>;
    mapObj?: TypeaheadObjectMap;
}

@Component({
    selector: 'hlc-clr-typeahead',
    templateUrl: './typeahead.component.html',
    styleUrls: ['./typeahead.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrTypeaheadComponent),
            multi: true,
        },
    ],
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

    @ViewChild('input')
    input: any;

    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    getKey(obj: any) {
        return this.config && this.config.mapObj ? obj[this.config.mapObj.key] : obj;
    }

    getLabel = (obj: any) => {
        return this.config && this.config.mapObj ? obj[this.config.mapObj.label] : obj;
    };

    getDescription(obj: any) {
        return (
            this.config && this.config.mapObj && this.config.mapObj.description && obj[this.config.mapObj.description]
        );
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
