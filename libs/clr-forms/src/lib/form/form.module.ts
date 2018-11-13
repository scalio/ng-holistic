import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
    FieldsLayoutMap,
    HLC_FIELDS_LAYOUT_MAP,
    GroupsLayoutMap,
    HLC_GROUPS_LAYOUT,
    HLC_FORM_FIELD_WRAPPER,
    FormModule,
    FieldsLayoutModule
} from '@ng-holistic/forms';
import { clrFieldsLayoutMap } from '../fields-layout';
import { clrGroupLayoutsMap } from '../group-layouts-map';
import { InputContainerModule, InputContainerComponent } from '../input-container';
import { ClrFormComponent } from './form.component';
import { TextModule, TextAreaModule, DateModule, SelectModule } from '@ng-holistic/clr-controls';
import { TabsLayoutModule } from '../tabs-layout';
import { GroupsLayoutModule } from '../groups-layout';

@NgModule({
    imports: [
        CommonModule,
        FormModule,
        TextModule,
        TextAreaModule,
        DateModule,
        SelectModule,
        FieldsLayoutModule,
        TabsLayoutModule,
        GroupsLayoutModule,
        InputContainerModule
    ],
    declarations: [ClrFormComponent],
    // export FieldsLayoutModule to reexport CustomField directive
    exports: [ClrFormComponent, FieldsLayoutModule]
})
export class ClrFormModule {
    static forRoot(fieldsLayoutMap?: FieldsLayoutMap, groupsLayoutMap?: GroupsLayoutMap): ModuleWithProviders {
        return {
            ngModule: ClrFormModule,
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
                    useValue: InputContainerComponent
                }
            ]
        };
    }
}
