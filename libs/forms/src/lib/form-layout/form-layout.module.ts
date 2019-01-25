import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HlcGroupLayoutHostDirective, GroupsLayoutMap, HLC_GROUPS_LAYOUT } from './form-layout-host.directive';
import { HlcFormLayoutComponent } from './form-layout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [HlcFormLayoutComponent, HlcGroupLayoutHostDirective],
    imports: [CommonModule, ReactiveFormsModule],
    providers: [],
    exports: [HlcFormLayoutComponent]
})
export class HlcFormLayoutModule {
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
