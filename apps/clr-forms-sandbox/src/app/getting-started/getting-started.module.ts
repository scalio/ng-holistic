import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { GettingStartedRoutingModule, routes } from './getting-started.routing.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes), AppsSharedModule, GettingStartedRoutingModule]
})
export class GettingStartedModule {}
