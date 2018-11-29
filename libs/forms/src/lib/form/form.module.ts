import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormLayoutModule, GroupsLayoutMap, HLC_GROUPS_LAYOUT } from '../form-layout/index';
import { FormComponent } from './form.component';

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
