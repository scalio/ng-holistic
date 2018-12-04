import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
    CheckboxesModule,
    DateModule,
    DateTimeModule,
    OptionsModule,
    SelectModule,
    TextAreaModule,
    TextModule,
    ToggleModule,
    DateRangeModule
} from '@ng-holistic/clr-controls';
import {
    FieldsLayoutMap,
    FieldsLayoutModule,
    FormModule,
    GroupsLayoutMap,
    HLC_FIELDS_LAYOUT_MAP,
    HLC_FORM_FIELD_WRAPPER,
    HLC_GROUPS_LAYOUT
} from '@ng-holistic/forms';
import { values } from 'ramda';
import { clrFieldsLayoutMap } from '../fields-layout';
import { clrGroupLayoutsMap } from '../group-layouts-map';
import { GroupsLayoutModule } from '../groups-layout';
import { InputContainerComponent, InputContainerModule } from '../input-container';
import { TabsLayoutModule } from '../tabs-layout';
import { ClrFormComponent } from './form.component';

@NgModule({
    // TODO: field components modules in separate const
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
        InputContainerModule,
        ToggleModule,
        OptionsModule,
        CheckboxesModule,
        DateTimeModule,
        DateRangeModule
    ],
    declarations: [ClrFormComponent],
    // export FieldsLayoutModule to reexport CustomField directive
    exports: [ClrFormComponent, FieldsLayoutModule],
    entryComponents: values(clrFieldsLayoutMap)
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
