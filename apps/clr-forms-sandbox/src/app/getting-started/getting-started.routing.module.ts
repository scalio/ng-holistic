import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstFormComponent } from './first-form/first-form.component';
import { InstallPackagesComponent } from './install-packages/install-packages.component';
import { OverviewComponent } from './overview/overview.component';
import { OverviewModule } from './overview/overview.module';

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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), OverviewModule],
    exports: [RouterModule],
    entryComponents: []
})
export class GettingStartedRoutingModule {}
