import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldsLayoutComponent, FieldsLayoutMap, HLC_FIELDS_LAYOUT_MAP } from './fields-layout.component';
import { FormFieldHostDirective, HLC_FORM_FIELD_WRAPPER } from './form-field-host.directive';
import { CustomFieldDirective } from './custom-field.directive';

@NgModule({
    declarations: [FieldsLayoutComponent, FormFieldHostDirective, CustomFieldDirective],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    providers: [],
    exports: [FieldsLayoutComponent, CustomFieldDirective],
    entryComponents: [FieldsLayoutComponent]
})
export class FieldsLayoutModule {
    static forRoot(fieldsLayoutMap: FieldsLayoutMap, fieldWrapper?: Type<any>): ModuleWithProviders {
        return {
            ngModule: FieldsLayoutModule,
            providers: [
                {
                    provide: HLC_FIELDS_LAYOUT_MAP,
                    multi: true,
                    useValue: fieldsLayoutMap
                },
                {
                    provide: HLC_FORM_FIELD_WRAPPER,
                    useValue: fieldWrapper
                }
            ]
        };
    }
}
