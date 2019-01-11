import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WizardBasePageComponent } from './wizard-base-page.component';

@NgModule({
    imports: [CommonModule],
    declarations: [WizardBasePageComponent],
    exports: [WizardBasePageComponent]
})
export class WizardBasePageModule {}
