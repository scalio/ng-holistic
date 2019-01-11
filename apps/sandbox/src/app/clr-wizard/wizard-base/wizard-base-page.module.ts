import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrWizardModule } from '@clr/angular';
import { WizardBasePageComponent } from './wizard-base-page.component';

@NgModule({
    imports: [CommonModule, ClrWizardModule],
    declarations: [WizardBasePageComponent],
    exports: [WizardBasePageComponent]
})
export class WizardBasePageModule {}
