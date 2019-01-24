import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule as CdkOverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { ModalComponent } from './modal/modal.component';
import { OverlayService } from './overlay.service';
import { ModalService } from './modal.service';
import { ClrModalModule, ClrIconModule } from '@clr/angular';
import { HlcClrAlertModalComponent } from './alert-modal/alert-modal.component';
import { HlcClrConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { NgxComponentOutlet } from '../ngxComponentOutlet';
import { HlcClrFormFooterModule } from '../form-footer/form-footer.module';
import { HlcClrFormErrorModule } from '../form-error/form-error.module';
import { HlcClrAlertModule } from '../alert/alert.module';

@NgModule({
    imports: [
        CommonModule,
        CdkOverlayModule,
        A11yModule,
        ClrModalModule,
        ClrIconModule,
        HlcClrFormFooterModule,
        HlcClrFormErrorModule,
        HlcClrAlertModule
    ],
    declarations: [ModalComponent, NgxComponentOutlet, HlcClrAlertModalComponent, HlcClrConfirmModalComponent],
    exports: [ModalComponent, NgxComponentOutlet],
    providers: [OverlayService, ModalService, NgxComponentOutlet],
    entryComponents: [ModalComponent, HlcClrAlertModalComponent, HlcClrConfirmModalComponent]
})
export class HlcClrModalModule {}
