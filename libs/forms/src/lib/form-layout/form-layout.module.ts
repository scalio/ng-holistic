import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { GroupLayoutHostDirective, GroupsLayoutMap, HLC_GROUPS_LAYOUT } from './form-layout-host.directive';
import { FormLayoutComponent } from './form-layout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [FormLayoutComponent, GroupLayoutHostDirective],
    imports: [CommonModule, ReactiveFormsModule],
    providers: [],
    exports: [FormLayoutComponent]
})
export class FormLayoutModule {
    static forRoot(groupsLayoutMap: GroupsLayoutMap): ModuleWithProviders {
        return {
            ngModule: FormLayoutModule,
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
