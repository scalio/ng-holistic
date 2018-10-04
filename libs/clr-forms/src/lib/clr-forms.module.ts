import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldsLayoutMap, HLC_FIELDS_LAYOUT_MAP, FieldsLayoutModule } from '@ng-holistic/forms';
import { clrFieldsLayoutMap } from './fields-layout';
import { TextModule } from '@ng-holistic/clr-controls';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FieldsLayoutModule, TextModule],
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
