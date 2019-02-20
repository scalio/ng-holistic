import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrActionButtonModule } from '@ng-holistic/clr-common';
import { ActionButtonPageComponent } from './action-button-page.component';

@NgModule({
    declarations: [ActionButtonPageComponent],
    imports: [CommonModule, HlcClrActionButtonModule],
    exports: []
})
export class ActionButtonPageModule {}
