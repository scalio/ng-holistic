import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrIconModule } from '@clr/angular';
import { HlcFileUploadComponent } from './file-upload.component';
import { FileUploaderModule } from '../file-uploader';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ClrIconModule, FileUploaderModule],
    declarations: [HlcFileUploadComponent],
    exports: [HlcFileUploadComponent]
})
export class FileUploadModule {}
