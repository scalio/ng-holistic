import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { DduxPageComponent } from './ddux-page.component';

@NgModule({
    declarations: [DduxPageComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule],
    exports: [DduxPageComponent]
})
export class DduxPageModule {}
