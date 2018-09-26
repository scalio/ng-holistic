import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldsLayoutComponent, FieldsLayoutMap, HLC_FORM_FIELD } from './fields-layout.component';
import { FormFieldHostDirective } from './form-field-host.directive';

@NgModule({
    declarations: [FieldsLayoutComponent, FormFieldHostDirective],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, PortalModule],
    providers: [],
    exports: [FieldsLayoutComponent]
})
export class FieldsLayoutModule {
    static forRoot(fieldsLayoutMap: FieldsLayoutMap): ModuleWithProviders {
        return {
            ngModule: FieldsLayoutModule,
            providers: [
                {
                    provide: HLC_FORM_FIELD,
                    multi: true,
                    useValue: fieldsLayoutMap
                }
            ]
        };
    }
}
