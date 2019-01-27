import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule as CdkOverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { HlcClrModalComponent } from './modal/modal.component';
import { HlcClrOverlayService } from './overlay.service';
import { HlcClrModalService } from './modal.service';
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
    declarations: [HlcClrModalComponent, NgxComponentOutlet, HlcClrAlertModalComponent, HlcClrConfirmModalComponent],
    exports: [HlcClrModalComponent, NgxComponentOutlet],
    providers: [HlcClrOverlayService, HlcClrModalService, NgxComponentOutlet],
    entryComponents: [HlcClrModalComponent, HlcClrAlertModalComponent, HlcClrConfirmModalComponent]
})
export class HlcClrModalModule {}
