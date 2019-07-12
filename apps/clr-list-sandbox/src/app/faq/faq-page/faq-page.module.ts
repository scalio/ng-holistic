import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { FaqPageComponent } from './faq-page.component';

@NgModule({
    declarations: [FaqPageComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule],
    exports: [FaqPageComponent]
})
export class FaqPageModule {}
