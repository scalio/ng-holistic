import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageUploadModule } from '@ng-holistic/clr-controls';
import { ImageUploadPageComponent } from './image-upload-page.component';

@NgModule({
    declarations: [ImageUploadPageComponent],
    imports: [CommonModule, ImageUploadModule],
    exports: [ImageUploadPageComponent]
})
export class ImageUploaderPageModule {}
