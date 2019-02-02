import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import {
    FirstFormComponent,
    PageSampleFormModule,
    PageSampleFormObsPropModule,
    PageSampleOutputFormModule
} from './first-form.component';

@NgModule({
    declarations: [FirstFormComponent],
    imports: [
        CommonModule,
        AppsSharedModule,
        PageSampleFormModule,
        RouterModule,
        PageSampleFormObsPropModule,
        PageSampleOutputFormModule
    ]
})
export class FirstFormModule {}
