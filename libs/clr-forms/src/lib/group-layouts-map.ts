import { FieldsLayoutComponent } from '@ng-holistic/forms';
import { HlcClrGroupLayoutComponent, HlcClrGroupsLayoutComponent } from './groups-layout/groups-layout.component';
import { TabsLayoutComponent } from './tabs-layout/tabs-layout.component';
import { WizardLayoutComponent } from './wzard-layout/wizard-layout.component';

export const clrGroupLayoutsMap = {
    fields: FieldsLayoutComponent,
    group: HlcClrGroupsLayoutComponent,
    tab: HlcClrGroupLayoutComponent,
    tabs: TabsLayoutComponent,
    wizard: WizardLayoutComponent
};
