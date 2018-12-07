import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule as CdkOverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { ModalComponent } from './modal/modal.component';
import { OverlayService } from './overlay.service';
import { ModalService } from './modal.service';
import { ClrModalModule, ClrIconModule } from '@clr/angular';
import { NgxComponentOutlet } from '../../ng';
import { AlertModalService } from './alert-modal.service';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AlertModule } from '../../alert';
import { FlimeTranslateModule } from '../../translate';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
    imports: [
        CommonModule,
        CdkOverlayModule,
        A11yModule,
        ClrModalModule,
        ClrIconModule,
        AlertModule,
        FlimeTranslateModule
    ],
    declarations: [ModalComponent, NgxComponentOutlet, AlertModalComponent, ConfirmModalComponent],
    exports: [ModalComponent, NgxComponentOutlet],
    providers: [OverlayService, ModalService, NgxComponentOutlet, AlertModalService],
    entryComponents: [ModalComponent, AlertModalComponent, ConfirmModalComponent]
})
export class FmOverlayModule {}
