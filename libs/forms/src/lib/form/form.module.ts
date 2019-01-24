import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { HlcFormLayoutModule } from '../form-layout/form-layout.module';
import { GroupsLayoutMap, HLC_GROUPS_LAYOUT } from '../form-layout/form-layout-host.directive';

@NgModule({
    declarations: [FormComponent],
    imports: [CommonModule, HlcFormLayoutModule],
    providers: [],
    exports: [FormComponent, HlcFormLayoutModule]
})
export class HlcFormModule {
    static forRoot(groupsLayoutMap: GroupsLayoutMap): ModuleWithProviders {
        return {
            ngModule: HlcFormLayoutModule,
            providers: [
                {
                    provide: HLC_GROUPS_LAYOUT,
                    multi: true,
                    useValue: groupsLayoutMap
                }
            ]
        };
    }
}
