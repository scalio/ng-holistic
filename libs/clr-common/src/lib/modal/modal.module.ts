import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule as CdkOverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { ModalComponent } from './modal/modal.component';
import { OverlayService } from './overlay.service';
import { ModalService } from './modal.service';
import { ClrModalModule, ClrIconModule } from '@clr/angular';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { NgxComponentOutlet } from '../ngxComponentOutlet';
import { FormFooterModule } from '../form-footer/form-footer.module';
import { FormErrorModule } from '../form-error/form-error.module';

@NgModule({
    imports: [
        CommonModule,
        CdkOverlayModule,
        A11yModule,
        ClrModalModule,
        ClrIconModule,
        FormFooterModule,
        FormErrorModule
    ],
    declarations: [ModalComponent, NgxComponentOutlet, AlertModalComponent, ConfirmModalComponent],
    exports: [ModalComponent, NgxComponentOutlet],
    providers: [OverlayService, ModalService, NgxComponentOutlet],
    entryComponents: [ModalComponent, AlertModalComponent, ConfirmModalComponent]
})
export class HlcClrModalModule {}
