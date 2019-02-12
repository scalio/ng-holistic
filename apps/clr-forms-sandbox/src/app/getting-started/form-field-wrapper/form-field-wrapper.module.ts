import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { FormFieldWrapperComponent } from './form-field-wrapper.component';

@NgModule({
    declarations: [FormFieldWrapperComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule]
})
export class FormFieldWrapperModule {}
