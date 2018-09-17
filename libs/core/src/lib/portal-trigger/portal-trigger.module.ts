import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { PortalTriggerDirective } from './portal-trigger.directive';

@NgModule({
    imports: [CommonModule, OverlayModule, A11yModule],
    declarations: [PortalTriggerDirective],
    exports: [PortalTriggerDirective]
})
export class PortalTriggerModule {}
