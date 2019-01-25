import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFieldDirective, CustomFieldInputDirective } from './custom-field.directive';
import { FieldsLayoutMap, HlcFieldsLayoutComponent, HLC_FIELDS_LAYOUT_MAP } from './fields-layout.component';
import { HlcFormFieldHostDirective, HLC_FORM_FIELD_WRAPPER } from './form-field-host.directive';

@NgModule({
    declarations: [
        HlcFieldsLayoutComponent,
        HlcFormFieldHostDirective,
        CustomFieldDirective,
        CustomFieldInputDirective
    ],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    providers: [],
    exports: [HlcFieldsLayoutComponent, CustomFieldDirective, CustomFieldInputDirective],
    entryComponents: [HlcFieldsLayoutComponent]
})
export class HlcFieldsLayoutModule {
    static forRoot(fieldsLayoutMap: FieldsLayoutMap, fieldWrapper?: Type<any>): ModuleWithProviders {
        return {
            ngModule: HlcFieldsLayoutModule,
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
