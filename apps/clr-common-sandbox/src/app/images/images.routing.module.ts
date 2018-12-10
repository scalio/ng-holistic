import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImgOverlayPageComponent } from './img-overlay-page/img-overlay-page.component';
import { ImgOverlayPageModule } from './img-overlay-page/img-overlay-page.module';

export const routes: Routes = [
    {
        path: 'img-overlay',
        component: ImgOverlayPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), ImgOverlayPageModule],
    exports: [RouterModule],
    entryComponents: []
})
export class ImagesRoutingModule {}
