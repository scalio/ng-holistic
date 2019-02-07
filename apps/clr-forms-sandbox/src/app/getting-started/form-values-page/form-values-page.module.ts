import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { FormValuesPageComponent, PageSampleFormModule } from './form-values-page.component';

@NgModule({
    declarations: [FormValuesPageComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule, PageSampleFormModule]
})
export class FormValuesPageModule {}
