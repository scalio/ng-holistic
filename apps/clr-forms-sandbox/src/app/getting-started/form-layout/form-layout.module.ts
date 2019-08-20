import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { FormLayoutComponent } from './form-layout.component';

@NgModule({
    declarations: [FormLayoutComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule]
})
export class FormLayoutModule {}
