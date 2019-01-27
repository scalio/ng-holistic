import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
    FieldsLayoutMap,
    GroupsLayoutMap,
    HlcFieldsLayoutModule,
    HlcFormModule,
    HLC_FIELDS_LAYOUT_MAP,
    HLC_FORM_FIELD_WRAPPER,
    HLC_GROUPS_LAYOUT
} from '@ng-holistic/forms';
import {
    clrFieldsLayoutComponents,
    clrFieldsLayoutMap,
    clrFieldsLayoutModules
} from '../fields-layout/fields-layout-map';
import { GroupLayoutModule } from '../group-layout/group-layout.module';
import { clrGroupLayoutsMap } from '../group-layouts-map';
import { HlcClrInputContainerComponent } from '../input-container/input-container.component';
import { HlcClrInputContainerModule } from '../input-container/input-container.module';
import { HlcClrTabsLayoutModule } from '../tabs-layout/tabs-layout.module';
import { HlcClrFormComponent } from './form.component';

@NgModule({
    imports: [
        CommonModule,
        HlcFormModule,
        HlcFieldsLayoutModule,
        HlcClrTabsLayoutModule,
        GroupLayoutModule,
        HlcClrInputContainerModule,
        ...clrFieldsLayoutModules
    ],
    declarations: [HlcClrFormComponent],
    exports: [HlcClrFormComponent, HlcFieldsLayoutModule],
    entryComponents: clrFieldsLayoutComponents
})
export class HlcClrFormModule {
    static forRoot(
        fieldsLayoutMap?: FieldsLayoutMap,
        groupsLayoutMap?: GroupsLayoutMap,
        inputContainer?: any
    ): ModuleWithProviders {
        return {
            ngModule: HlcClrFormModule,
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
                    useValue: inputContainer || HlcClrInputContainerComponent
                }
            ]
        };
    }
}
