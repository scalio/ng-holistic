import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrIconModule } from '@clr/angular';
import { ImageUploadComponent } from './image-upload.component';
import { FileUploaderModule } from '../file-uploader';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ClrIconModule, FileUploaderModule],
    declarations: [ImageUploadComponent],
    exports: [ImageUploadComponent]
})
export class ImageUploadModule {}
