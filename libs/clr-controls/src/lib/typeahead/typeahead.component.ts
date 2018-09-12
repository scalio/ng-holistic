import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';

export interface TypeaheadConfig {
    search: (text: string) => Observable<string[]>;
}

@Component({
    selector: 'hlc-typeahead',
    templateUrl: './typeahead.component.html',
    styleUrls: ['./typeahead.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TypeaheadComponent),
            multi: true
        }
    ]
})
export class TypeaheadComponent implements OnInit, ControlValueAccessor {
    @Input() value: any;
    @Input() config: TypeaheadConfig | undefined;
    @Input() readonly: boolean | undefined;

    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    get search() {
        return this.config && this.config.search;
    }

    onChange($event: any) {
        this.value = $event;
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
}
