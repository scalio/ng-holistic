import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrImageUploadModule } from '@ng-holistic/clr-file-upload';
import { ImageUploadPageComponent } from './image-upload-page.component';

@NgModule({
    declarations: [ImageUploadPageComponent],
    imports: [CommonModule, HlcClrImageUploadModule],
    exports: [ImageUploadPageComponent]
})
export class ImageUploadPageModule {}
