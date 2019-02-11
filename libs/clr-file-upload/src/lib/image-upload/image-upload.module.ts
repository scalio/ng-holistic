import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { HlcClrImageModule } from '@ng-holistic/clr-common';
import { HlcClrFileUploadModule } from '@ng-holistic/clr-file-upload';
import { HlcClrImageUploadComponent } from './image-upload.component';

@NgModule({
    imports: [CommonModule, ClrIconModule, HlcClrFileUploadModule, HlcClrImageModule],
    declarations: [HlcClrImageUploadComponent],
    exports: [HlcClrImageUploadComponent]
})
export class HlcClrImageUploadModule {}
