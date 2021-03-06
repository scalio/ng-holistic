import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { HlcFilePreviewOverlayModule } from '../file-preview-overlay/file-preview-overlay.module';
import { HlcClrImgOverlayModule } from '../img-overlay/img-overlay.module';
import { ImageCropperModule } from '../ngx-image-cropper/image-cropper.module';
import { HlcClrImageComponent } from './image.component';

@NgModule({
    declarations: [HlcClrImageComponent],
    exports: [HlcClrImageComponent],
    imports: [CommonModule, ClrIconModule, HlcClrImgOverlayModule, HlcFilePreviewOverlayModule, ImageCropperModule],
    providers: []
})
export class HlcClrImageModule {}
