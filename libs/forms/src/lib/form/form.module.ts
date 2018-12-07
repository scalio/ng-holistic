import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { FormLayoutModule } from '../form-layout/form-layout.module';
import { GroupsLayoutMap, HLC_GROUPS_LAYOUT } from '../form-layout/form-layout-host.directive';

@NgModule({
    declarations: [FormComponent],
    imports: [CommonModule, FormLayoutModule],
    providers: [],
    exports: [FormComponent, FormLayoutModule]
})
export class FormModule {
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
