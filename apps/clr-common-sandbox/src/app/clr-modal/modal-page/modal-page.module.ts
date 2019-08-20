import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClrInputModule } from '@clr/angular';
import { HlcClrModalModule } from '@ng-holistic/clr-common';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { ModalPageComponent, ModalPageFormComponent } from './modal-page.component';

@NgModule({
    declarations: [ModalPageComponent, ModalPageFormComponent],
    imports: [CommonModule, HlcClrModalModule, ReactiveFormsModule, HlcClrFormModule, ClrInputModule, RouterModule],
    exports: [ModalPageComponent],
    entryComponents: [ModalPageFormComponent]
})
export class ModalPageModule {}
