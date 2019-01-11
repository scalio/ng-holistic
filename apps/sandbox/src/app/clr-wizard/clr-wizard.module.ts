import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClrWizardRoutingModule, routes } from './clr-wizard.routing.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes), ClrWizardRoutingModule]
})
export class ClrWizardModule {}
