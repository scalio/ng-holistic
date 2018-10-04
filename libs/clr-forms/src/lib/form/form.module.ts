import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
    FieldsLayoutComponent,
    FormLayoutModule,
    FormModule,
    GroupsLayoutMap,
    HLC_GROUPS_LAYOUT
} from '@ng-holistic/forms';
import { ClrFormComponent } from './form.component';

@NgModule({
    declarations: [ClrFormComponent, FormModule],
    imports: [CommonModule],
    providers: [],
    exports: [ClrFormComponent]
})
export class ClrFormModule {
    static forRoot(groupsLayoutMap?: GroupsLayoutMap): ModuleWithProviders {
        return {
            ngModule: FormLayoutModule,
            providers: [
                {
                    provide: HLC_GROUPS_LAYOUT,
                    multi: true,
                    useValue: groupsLayoutMap
                },
                {
                    provide: HLC_GROUPS_LAYOUT,
                    multi: true,
                    useValue: {
                        fields: FieldsLayoutComponent
                    }
                }
            ]
        };
    }
}
