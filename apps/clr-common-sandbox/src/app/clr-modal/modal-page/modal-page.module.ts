import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalPageComponent } from './modal-page.component';
import { HlcClrModalModule } from '@ng-holistic/clr-common';


@NgModule({
    declarations: [ModalPageComponent],
    imports: [CommonModule, HlcClrModalModule],
    exports: [ModalPageComponent]
})
export class ModalPageModule {}
