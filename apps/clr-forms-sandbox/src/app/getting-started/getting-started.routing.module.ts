import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstFormComponent } from './first-form/first-form.component';
import { FirstFormModule } from './first-form/first-form.module';
import { FormValuesPageModule } from './form-values-page/form-values-page.module';
import { InstallPackagesComponent } from './install-packages/install-packages.component';
import { InstallPackagesModule } from './install-packages/install-packages.module';
import { OverviewComponent } from './overview/overview.component';
import { OverviewModule } from './overview/overview.module';
import { FormValuesPageComponent } from './form-values-page/form-values-page.component';
import { FormFieldPropsModule } from './form-field-props/form-field-props.module';
import { FormFieldPropsComponent } from './form-field-props/form-field-props.component';

export const routes: Routes = [
    {
        path: 'overview',
        component: OverviewComponent
    },
    {
        path: 'install-packages',
        component: InstallPackagesComponent
    },
    {
        path: 'first-form',
        component: FirstFormComponent
    },
    {
        path: 'form-values',
        component: FormValuesPageComponent
    },
    {
        path: 'form-field-props',
        component: FormFieldPropsComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        OverviewModule,
        InstallPackagesModule,
        FirstFormModule,
        FormValuesPageModule,
        FormFieldPropsModule
    ],
    exports: [RouterModule],
    entryComponents: []
})
export class GettingStartedRoutingModule {}
