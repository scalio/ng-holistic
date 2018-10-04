import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DateModule, SelectModule, TextAreaModule, TextModule } from '@ng-holistic/clr-controls';
import { FieldsLayoutMap, FieldsLayoutModule, HLC_FIELDS_LAYOUT_MAP } from '@ng-holistic/forms';
import { clrFieldsLayoutMap } from './fields-layout';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FieldsLayoutModule,
        TextModule,
        TextAreaModule,
        DateModule,
        SelectModule
    ],
    declarations: [],
    exports: []
})
export class ClrFormsModule {
    static forRoot(fieldsLayoutMap?: FieldsLayoutMap): ModuleWithProviders {
        return {
            ngModule: ClrFormsModule,
            providers: [
                {
                    provide: HLC_FIELDS_LAYOUT_MAP,
                    multi: true,
                    useValue: fieldsLayoutMap
                },
                {
                    provide: HLC_FIELDS_LAYOUT_MAP,
                    multi: true,
                    useValue: clrFieldsLayoutMap
                }
            ]
        };
    }
}
