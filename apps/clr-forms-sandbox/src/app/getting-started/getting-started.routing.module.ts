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
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        OverviewModule,
        InstallPackagesModule,
        FirstFormModule,
        FormValuesPageModule
    ],
    exports: [RouterModule],
    entryComponents: []
})
export class GettingStartedRoutingModule {}
