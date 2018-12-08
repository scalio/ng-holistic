import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { routes as clrModalRoutes } from './clr-modal/clr-modal.routing.module';
import { ModalPageModule } from './clr-modal/modal-page/modal-page.module';

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
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), AppLayoutModule, ModalPageModule],
    exports: [RouterModule]
})
export class AppRoutingModule {}
