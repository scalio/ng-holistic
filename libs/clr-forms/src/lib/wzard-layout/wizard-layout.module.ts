import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrWizardModule } from '@clr/angular';
import { WizardLayoutComponent } from './wizard-layout.component';

@NgModule({
    imports: [CommonModule, ClrWizardModule],
    declarations: [WizardLayoutComponent],
    exports: [WizardLayoutComponent],
    entryComponents: [WizardLayoutComponent]

})
export class WizardLayoutModule {}
