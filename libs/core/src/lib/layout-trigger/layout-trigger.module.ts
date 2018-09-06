import { NgModule } from '@angular/core';
import { LayoutTriggerDirective } from './layout-trigger.directive';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
    imports: [CommonModule, OverlayModule, A11yModule],
    declarations: [LayoutTriggerDirective],
    exports: [LayoutTriggerDirective],
})
export class LayoutTriggerModule {}
