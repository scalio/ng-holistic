import { FieldsLayoutComponent } from '@ng-holistic/forms';
import { HlcClrGroupLayoutComponent } from './group-layout/group-layout.component';
import { TabLayoutComponent, TabsLayoutComponent } from './tabs-layout/tabs-layout.component';

export const clrGroupLayoutsMap = {
    fields: FieldsLayoutComponent,
    group: HlcClrGroupLayoutComponent,
    tab: TabLayoutComponent,
    tabs: TabsLayoutComponent
};
