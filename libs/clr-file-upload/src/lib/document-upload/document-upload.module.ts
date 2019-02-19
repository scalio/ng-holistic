import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { HlcClrImageModule, ImageUtilsService } from '@ng-holistic/clr-common';
import { HlcClrFileUploadModule } from '../file-upload/file-upload.module';
import { HlcClrDocumentUploadComponent } from './document-upload.component';

@NgModule({
    imports: [CommonModule, ClrIconModule, HlcClrFileUploadModule, HlcClrImageModule],
    declarations: [HlcClrDocumentUploadComponent],
    exports: [HlcClrDocumentUploadComponent],
    providers: [ImageUtilsService]
})
export class HlcClrDocumentUploadModule {}
