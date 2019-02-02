import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { FirstFormComponent } from './first-form/first-form.component';
import { GettingStartedRoutingModule, routes } from './getting-started.routing.module';

@NgModule({
    declarations: [FirstFormComponent],
    imports: [CommonModule, RouterModule.forChild(routes), AppsSharedModule, GettingStartedRoutingModule]
})
export class GettingStartedModule {}
