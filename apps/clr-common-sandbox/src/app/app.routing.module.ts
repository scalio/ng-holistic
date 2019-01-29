import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { AsidePageModule } from './clr-aside/aside-page/aside-page.module';
import { routes as clrAsideRoutes } from './clr-aside/clr-aside.routing.module';
import { routes as clrModalRoutes } from './clr-modal/clr-modal.routing.module';
import { ModalPageModule } from './clr-modal/modal-page/modal-page.module';
import { ImagesModule } from './images/images.module';
import { routes as imagesRoutes } from './images/images.routing.module';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/clr-modal/modal',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: 'clr-modal',
                children: clrModalRoutes
            },
            {
                path: 'clr-aside',
                children: clrAsideRoutes
            },
            {
                path: 'images',
                children: imagesRoutes
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), AppLayoutModule, ModalPageModule, ImagesModule, AsidePageModule],
    exports: [RouterModule]
})
export class AppRoutingModule {}
