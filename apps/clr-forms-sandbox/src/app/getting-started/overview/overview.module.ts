import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { OverviewComponent, SampleFormModule } from './overview.component';

@NgModule({
    declarations: [OverviewComponent],
    imports: [CommonModule, AppsSharedModule, SampleFormModule, RouterModule]
})
export class OverviewModule {}
