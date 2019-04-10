import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule as CdkOverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule, ClrModalModule } from '@clr/angular';
import { HlcClrAlertModule } from '../alert/alert.module';
import { HlcClrFormErrorModule } from '../form-error/form-error.module';
import { HlcClrFormFooterModule } from '../form-footer/form-footer.module';
import { NgxComponentOutlet } from '../ngxComponentOutlet';
import { HlcClrAlertModalComponent } from './alert-modal/alert-modal.component';
import { HlcClrConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { HlcClrModalHintDirective } from './modal-hint.directive';
import { HlcClrModalService } from './modal.service';
import { HlcClrModalComponent } from './modal/modal.component';
import { HlcClrOverlayService } from './overlay.service';
import { HlcHotKeysModule } from '../hot-keys.service';

@NgModule({
    imports: [
        CommonModule,
        CdkOverlayModule,
        A11yModule,
        ClrModalModule,
        ClrIconModule,
        HlcClrFormFooterModule,
        HlcClrFormErrorModule,
        HlcClrAlertModule,
        HlcHotKeysModule
    ],
    declarations: [
        HlcClrModalComponent,
        NgxComponentOutlet,
        HlcClrAlertModalComponent,
        HlcClrConfirmModalComponent,
        HlcClrModalHintDirective
    ],
    exports: [HlcClrModalComponent, NgxComponentOutlet, HlcClrModalHintDirective],
    providers: [HlcClrOverlayService, HlcClrModalService, NgxComponentOutlet],
    entryComponents: [HlcClrModalComponent, HlcClrAlertModalComponent, HlcClrConfirmModalComponent]
})
export class HlcClrModalModule {}
