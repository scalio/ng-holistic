import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrWizardModule } from '@clr/angular';
import { WizardComponent } from './wizard.component';

@NgModule({
    imports: [CommonModule, ClrWizardModule],
    declarations: [WizardComponent],
    exports: [WizardComponent]
})
export class HlcClrWizardModule {}
