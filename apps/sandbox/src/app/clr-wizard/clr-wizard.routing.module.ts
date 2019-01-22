import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WizardBasePageComponent } from './wizard-base/wizard-base-page.component';
import { WizardBasePageModule } from './wizard-base/wizard-base-page.module';

export const routes: Routes = [
    {
        path: 'wizard-base',
        component: WizardBasePageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), WizardBasePageModule],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrWizardRoutingModule {}
