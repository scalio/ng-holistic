import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormModule } from '@ng-holistic/clr-forms';
// import { ClrWizardModule } from '@clr/angular';
import { WizardBasePageComponent } from './wizard-base-page.component';

@NgModule({
    imports: [CommonModule, ClrFormModule],
    declarations: [WizardBasePageComponent],
    exports: [WizardBasePageComponent]
})
export class WizardBasePageModule {}
