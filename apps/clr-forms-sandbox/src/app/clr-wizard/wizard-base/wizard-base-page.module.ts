import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrAlertModule } from '@ng-holistic/clr-common';
import { HlcClrWizardModule } from '@ng-holistic/clr-wizard';
// import { ClrFormModule } from '@ng-holistic/clr-forms';
// import { ClrWizardModule } from '@clr/angular';
import { WizardBasePageComponent } from './wizard-base-page.component';
import { WizardPageService as WizardBasePageService } from './wizard-base-page.service';

@NgModule({
    imports: [CommonModule, HlcClrWizardModule, HlcClrAlertModule],
    declarations: [WizardBasePageComponent],
    exports: [WizardBasePageComponent],
    providers: [WizardBasePageService]
})
export class WizardBasePageModule {}
