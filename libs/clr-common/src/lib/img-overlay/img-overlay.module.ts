import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImgOverlayComponent } from './img-overlay.component';

@NgModule({
    declarations: [ImgOverlayComponent],
    exports: [ImgOverlayComponent],
    imports: [CommonModule],
    providers: []
})
export class HlcClrImgOverlayModule {}
