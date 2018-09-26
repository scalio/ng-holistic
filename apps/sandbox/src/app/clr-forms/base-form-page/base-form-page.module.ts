import { CommonModule } from '@angular/common';
import { NgModule, Component, forwardRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseFormPageComponent } from './base-form-page.component';

import { FieldsLayoutModule } from '@ng-holistic/forms';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

///
@Component({
    selector: 'hlc-text-field',
    template: `<input type="text" [value]="value" (change)="onChange($event.target.value)" >`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextFieldComponent),
            multi: true
        }
    ]
})
export class TextFieldComponent implements OnInit, ControlValueAccessor {
    // TextFieldComponent
    @Input() readonly: boolean;
    //
    @Input() value: string | undefined;
    @Output() valueChange = new EventEmitter<string>();

    constructor() {}

    propagateChange = (_: any) => {};

    ngOnInit() {}

    onChange(val: string) {
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

@NgModule({
    declarations: [TextFieldComponent],
    exports: [TextFieldComponent],
    imports: [CommonModule, ReactiveFormsModule],
    providers: [],
    entryComponents: [TextFieldComponent]
})
export class TextFieldModule {}

///
@NgModule({
    declarations: [BaseFormPageComponent],
    imports: [
        CommonModule,
        FieldsLayoutModule.forRoot({ TextField: TextFieldComponent }),
        TextFieldModule,
        ReactiveFormsModule
    ],
    exports: [BaseFormPageComponent]
})
export class BaseFormPageModule {}
