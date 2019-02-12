import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcFilePreviewOverlayModule } from '@ng-holistic/clr-common';
import { ImgPreviewOverlayPageComponent } from './img-preview-page.component';

@NgModule({
    declarations: [ImgPreviewOverlayPageComponent],
    imports: [CommonModule, HlcFilePreviewOverlayModule],
    exports: []
})
export class ImgPreviewOverlayPageModule {}
