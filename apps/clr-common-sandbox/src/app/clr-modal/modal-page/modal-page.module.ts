import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalPageComponent, ModalPageFormComponent } from './modal-page.component';
import { HlcClrModalModule } from '@ng-holistic/clr-common';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrInputModule } from '@clr/angular';

@NgModule({
    declarations: [ModalPageComponent, ModalPageFormComponent],
    imports: [CommonModule, HlcClrModalModule, ReactiveFormsModule, HlcClrFormModule, ClrInputModule],
    exports: [ModalPageComponent],
    entryComponents: [ModalPageFormComponent]
})
export class ModalPageModule {}
