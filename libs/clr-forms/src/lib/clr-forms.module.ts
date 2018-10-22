import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DateModule, SelectModule, TextAreaModule, TextModule } from '@ng-holistic/clr-controls';
import {
    FieldsLayoutMap,
    FieldsLayoutModule,
    HLC_FIELDS_LAYOUT_MAP,
    GroupsLayoutMap,
    HLC_GROUPS_LAYOUT,
    HLC_FORM_FIELD_WRAPPER
} from '@ng-holistic/forms';
import { clrFieldsLayoutMap } from './fields-layout';
import { clrGroupLayoutsMap } from './group-layouts-map';
import { InputContainerModule } from './input-container';

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
    static forRoot(fieldsLayoutMap?: FieldsLayoutMap, groupsLayoutMap?: GroupsLayoutMap): ModuleWithProviders {
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
                },
                {
                    provide: HLC_GROUPS_LAYOUT,
                    multi: true,
                    useValue: clrGroupLayoutsMap
                },
                {
                    provide: HLC_GROUPS_LAYOUT,
                    multi: true,
                    useValue: groupsLayoutMap
                },
                {
                    provide: HLC_FORM_FIELD_WRAPPER,
                    useValue: InputContainerModule
                }
            ]
        };
    }
}
