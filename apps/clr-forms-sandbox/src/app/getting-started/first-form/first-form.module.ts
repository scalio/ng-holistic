import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { FirstFormComponent, PageSampleFormModule, PageSampleFormObsPropModule } from './first-form.component';

@NgModule({
    declarations: [FirstFormComponent],
    imports: [CommonModule, AppsSharedModule, PageSampleFormModule, RouterModule, PageSampleFormObsPropModule]
})
export class FirstFormModule {}
