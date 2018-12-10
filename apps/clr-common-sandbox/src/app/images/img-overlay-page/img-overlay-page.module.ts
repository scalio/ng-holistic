import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImgOverlayPageComponent } from './img-overlay-page.component';
import { ImgOverlayModule } from '@ng-holistic/clr-common';

@NgModule({
    declarations: [ImgOverlayPageComponent],
    imports: [CommonModule, ImgOverlayModule],
    exports: [ImgOverlayPageComponent]
})
export class ImgOverlayPageModule {}
