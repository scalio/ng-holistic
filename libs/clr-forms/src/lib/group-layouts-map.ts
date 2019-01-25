import { HlcFieldsLayoutComponent } from '@ng-holistic/forms';
import { HlcClrGroupLayoutComponent } from './group-layout/group-layout.component';
import { TabLayoutComponent, HlcClrTabsLayoutComponent } from './tabs-layout/tabs-layout.component';

export const clrGroupLayoutsMap = {
    fields: HlcFieldsLayoutComponent,
    group: HlcClrGroupLayoutComponent,
    tab: TabLayoutComponent,
    tabs: HlcClrTabsLayoutComponent
};
