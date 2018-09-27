import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldsLayoutComponent, FieldsLayoutMap, HLC_FORM_FIELD } from './fields-layout.component';
import { FormFieldHostDirective, HLC_FORM_FIELD_WRAPPER } from './form-field-host.directive';

@NgModule({
    declarations: [FieldsLayoutComponent, FormFieldHostDirective],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, PortalModule],
    providers: [],
    exports: [FieldsLayoutComponent]
})
export class FieldsLayoutModule {
    static forRoot(fieldsLayoutMap: FieldsLayoutMap, fieldWrapper?: Type<any>): ModuleWithProviders {
        return {
            ngModule: FieldsLayoutModule,
            providers: [
                {
                    provide: HLC_FORM_FIELD,
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
