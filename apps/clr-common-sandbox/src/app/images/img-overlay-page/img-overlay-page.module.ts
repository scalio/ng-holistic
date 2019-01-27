import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImgOverlayPageComponent } from './img-overlay-page.component';
import { HlcClrImgOverlayModule } from '@ng-holistic/clr-common';
import { ClrIconModule } from '@clr/angular';

@NgModule({
    declarations: [ImgOverlayPageComponent],
    imports: [CommonModule, HlcClrImgOverlayModule, ClrIconModule],
    exports: [ImgOverlayPageComponent]
})
export class ImgOverlayPageModule {}
