import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrIconModule } from '@clr/angular';
import { FileUploadComponent } from './file-upload.component';
import { FileUploaderModule } from '../file-uploader';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ClrIconModule, FileUploaderModule],
    declarations: [FileUploadComponent],
    exports: [FileUploadComponent]
})
export class FileUploadModule {}
