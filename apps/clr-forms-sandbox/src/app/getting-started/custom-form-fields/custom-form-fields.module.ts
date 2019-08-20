import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { CustomFormFieldsComponent } from './custom-form-fields.component';

@NgModule({
    declarations: [CustomFormFieldsComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule]
})
export class CustomFormFieldsModule {}
