import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCustomFieldsPageComponent } from './form-custom-fields-page/form-custom-fields-page.component';
import { FormCustomFieldsPageModule } from './form-custom-fields-page/form-custom-fields-page.module';
import { FormDynaPageComponent } from './form-dyna-page/form-dyna-page.component';
import { FormDynaPageModule } from './form-dyna-page/form-dyna-page.module';
// tslint:disable-next-line: max-line-length
import { FormErrorDisplayStrategyPageComponent } from './form-error-display-strategy-page/form-error-display-strategy-page.component';
// tslint:disable-next-line: max-line-length
import { FormErrorDisplayStrategyPageModule } from './form-error-display-strategy-page/form-error-display-strategy-page.module';
import { FormExtraPageComponent } from './form-extra-page/form-extra-page.component';
import { FormExtraPageModule } from './form-extra-page/form-extra-page.module';
import { FormFooterPageComponent } from './form-form-footer-page/form-footer-page.component';
import { FormFooterPageModule } from './form-form-footer-page/form-footer-page.module';
import { FormFullPageComponent } from './form-full-page/form-full-page.component';
import { FormFullPageModule } from './form-full-page/form-full-page.module';
import { FormGroupsPageComponent } from './form-groups-page/form-groups-page.component';
import { FormGroupsPageModule } from './form-groups-page/form-groups-page.module';
import { FormInAsidePageComponent } from './form-in-aside-page/form-in-aside-page.component';
import { FormInAsidePageModule } from './form-in-aside-page/form-in-aside-page.module';
import { FormInModalPageComponent } from './form-in-modal-page/form-in-modal-page.component';
import { FormInModalPageModule } from './form-in-modal-page/form-in-modal-page.module';
import { FormPageComponent } from './form-page/form-page.component';
import { FormPageModule } from './form-page/form-page.module';
import { FormReadWriteValuePageComponent } from './form-read-write-value-page/form-read-write-value-page.component';
import { FormReadWriteValuePageModule } from './form-read-write-value-page/form-read-write-value-page.module';
import { FormRecalcPageComponent } from './form-recalc-page/form-recalc-page.component';
import { FormRecalcPageModule } from './form-recalc-page/form-recalc-page.module';

export const routes: Routes = [
    {
        path: 'form',
        component: FormPageComponent
    },
    {
        path: 'form-error-display-strategy',
        component: FormErrorDisplayStrategyPageComponent
    },
    {
        path: 'form-read-write-value',
        component: FormReadWriteValuePageComponent
    },
    {
        path: 'form-extra',
        component: FormExtraPageComponent
    },
    {
        path: 'form-groups',
        component: FormGroupsPageComponent
    },
    {
        path: 'form-recalc',
        component: FormRecalcPageComponent
    },
    {
        path: 'form-custom-fields',
        component: FormCustomFieldsPageComponent
    },
    {
        path: 'form-full',
        component: FormFullPageComponent
    },
    {
        path: 'form-dyna',
        component: FormDynaPageComponent
    },
    {
        path: 'form-in-modal',
        component: FormInModalPageComponent
    },
    {
        path: 'form-in-aside',
        component: FormInAsidePageComponent
    },
    {
        path: 'form-footer',
        component: FormFooterPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FormPageModule,
        FormExtraPageModule,
        FormGroupsPageModule,
        FormRecalcPageModule,
        FormCustomFieldsPageModule,
        FormFullPageModule,
        FormDynaPageModule,
        FormInModalPageModule,
        FormInAsidePageModule,
        FormErrorDisplayStrategyPageModule,
        FormReadWriteValuePageModule,
        FormFooterPageModule
    ],
    exports: [RouterModule],
    providers: []
})
export class ClrFormsRoutingModule {}
