import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrImgOverlayComponent } from './img-overlay.component';

@NgModule({
    declarations: [HlcClrImgOverlayComponent],
    exports: [HlcClrImgOverlayComponent],
    imports: [CommonModule],
    providers: []
})
export class HlcClrImgOverlayModule {}
