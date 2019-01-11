import { FieldsLayoutComponent } from '@ng-holistic/forms';
import { GroupLayoutComponent, GroupsLayoutComponent } from './groups-layout/groups-layout.component';
import { TabsLayoutComponent } from './tabs-layout/tabs-layout.component';
import { WizardLayoutComponent } from './wzard-layout/wizard-layout.component';

export const clrGroupLayoutsMap = {
    fields: FieldsLayoutComponent,
    group: GroupsLayoutComponent,
    tab: GroupLayoutComponent,
    tabs: TabsLayoutComponent,
    wizard: WizardLayoutComponent
};
