import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrIconModule, ClrDatagridModule } from '@clr/angular';
import { HlcClrFileUploadComponent } from './file-upload.component';
import { HlcClrFileUploaderModule } from '../file-uploader/file-uploader.module';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ClrIconModule, HlcClrFileUploaderModule, ClrDatagridModule],
    declarations: [HlcClrFileUploadComponent],
    exports: [HlcClrFileUploadComponent]
})
export class HlcClrFileUploadModule {}
