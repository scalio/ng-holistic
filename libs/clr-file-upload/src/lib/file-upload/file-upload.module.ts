import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrIconModule } from '@clr/angular';
import { HlcClrFileUploaderModule } from '../file-uploader/file-uploader.module';
import { HlcClrFileUploadComponent } from './file-upload.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ClrIconModule, HlcClrFileUploaderModule],
    declarations: [HlcClrFileUploadComponent],
    exports: [HlcClrFileUploadComponent]
})
export class HlcClrFileUploadModule {}
