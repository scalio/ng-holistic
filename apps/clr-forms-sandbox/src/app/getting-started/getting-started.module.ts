import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { FirstFormComponent } from './first-form/first-form.component';
import { GettingStartedRoutingModule, routes } from './getting-started.routing.module';
import { InstallPackagesComponent } from './install-packages/install-packages.component';

@NgModule({
    declarations: [InstallPackagesComponent, FirstFormComponent],
    imports: [CommonModule, RouterModule.forChild(routes), AppsSharedModule, GettingStartedRoutingModule]
})
export class GettingStartedModule {}
