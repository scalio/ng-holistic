import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { ClrInputModule } from '@clr/angular';
import { HlcClrModalModule } from '@ng-holistic/clr-common';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { ModalPageComponent, ModalPageFormComponent } from './modal-page.component';

@NgModule({
    declarations: [ModalPageComponent, ModalPageFormComponent],
    imports: [
        CommonModule,
        HlcClrModalModule,
        ReactiveFormsModule,
        HlcClrFormModule,
        ClrInputModule,
        RouterModule,
        AppsSharedModule
    ],
    exports: [ModalPageComponent],
    entryComponents: [ModalPageFormComponent]
})
export class ModalPageModule {}
