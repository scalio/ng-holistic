import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrIconModule } from '@clr/angular';
import { FileUploadComponent } from './file-upload.component';
import { FileMultiUploaderModule } from '../file-multi-uploader';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ClrIconModule, FileMultiUploaderModule],
    declarations: [FileUploadComponent],
    exports: [FileUploadComponent]
})
export class FileUploadModule {}
