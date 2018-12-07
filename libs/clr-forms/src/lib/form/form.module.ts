import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
    FieldsLayoutMap,
    FieldsLayoutModule,
    FormModule,
    GroupsLayoutMap,
    HLC_FIELDS_LAYOUT_MAP,
    HLC_FORM_FIELD_WRAPPER,
    HLC_GROUPS_LAYOUT
} from '@ng-holistic/forms';
// import { clrFieldsLayoutComponents, clrFieldsLayoutMap, clrFieldsLayoutModules } from '../fields-layout/index';
import { clrGroupLayoutsMap } from '../group-layouts-map';
import { GroupsLayoutModule } from '../groups-layout/index';
import { InputContainerComponent, InputContainerModule } from '../input-container/index';
import { TabsLayoutModule } from '../tabs-layout/index';
import { ClrFormComponent } from './form.component';


import {
    CheckboxesComponent,
    CheckboxesModule,
    DateComponent,
    DateModule,
    DateRangeComponent,
    DateRangeModule,
    DateTimeComponent,
    DateTimeModule,
    MaskComponent,
    MaskModule,
    OptionsComponent,
    OptionsModule,
    SelectComponent,
    SelectModule,
    TextAreaComponent,
    TextAreaModule,
    TextComponent,
    TextModule,
    ToggleComponent,
    ToggleModule
} from '@ng-holistic/clr-controls';

/**
 * Predefined set of controls based on clarity design system which could be possible generated on form layout.
 */
const clrFieldsLayoutMap = {
    TextField: TextComponent,
    TextAreaField: TextAreaComponent,
    SelectField: SelectComponent,
    DateField: DateComponent,
    ToggleField: ToggleComponent,
    OptionsField: OptionsComponent,
    CheckboxesField: CheckboxesComponent,
    DateTimeField: DateTimeComponent,
    DateRangeField: DateRangeComponent,
    MaskField: MaskComponent
};

const clrFieldsLayoutComponents = [
    TextComponent,
    TextAreaComponent,
    SelectComponent,
    DateComponent,
    ToggleComponent,
    OptionsComponent,
    CheckboxesComponent,
    DateTimeComponent,
    DateRangeComponent,
    MaskComponent
];

const clrFieldsLayoutModules = [
    TextModule,
    TextAreaModule,
    SelectModule,
    DateModule,
    ToggleModule,
    OptionsModule,
    CheckboxesModule,
    DateTimeModule,
    DateRangeModule,
    MaskModule
];

@NgModule({
    imports: [
        CommonModule,
        FormModule,
        FieldsLayoutModule,
        TabsLayoutModule,
        GroupsLayoutModule,
        InputContainerModule,
        ...clrFieldsLayoutModules
    ],
    declarations: [ClrFormComponent],
    exports: [ClrFormComponent, FieldsLayoutModule],
    entryComponents: clrFieldsLayoutComponents
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
