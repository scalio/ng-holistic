import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrImageModule } from '@ng-holistic/clr-common';
import { ImagePageComponent } from './image-page.component';

@NgModule({
    declarations: [ImagePageComponent],
    imports: [CommonModule, HlcClrImageModule],
    exports: []
})
export class ImagePageModule {}
