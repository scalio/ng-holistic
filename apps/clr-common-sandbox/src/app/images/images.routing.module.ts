import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagePageComponent } from './image-page/image-page.component';
import { ImagePageModule } from './image-page/image-page.module';
import { ImgOverlayPageComponent } from './img-overlay-page/img-overlay-page.component';
import { ImgOverlayPageModule } from './img-overlay-page/img-overlay-page.module';
import { ImgPreviewOverlayPageComponent } from './img-preview-page/img-preview-page.component';
import { ImgPreviewOverlayPageModule } from './img-preview-page/img-preview-page.module';

export const routes: Routes = [
    {
        path: 'img-overlay',
        component: ImgOverlayPageComponent
    },
    {
        path: 'img-preview',
        component: ImgPreviewOverlayPageComponent
    },
    {
        path: 'image',
        component: ImagePageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), ImgOverlayPageModule, ImgPreviewOverlayPageModule, ImagePageModule],
    exports: [RouterModule],
    entryComponents: []
})
export class ImagesRoutingModule {}
