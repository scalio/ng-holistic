import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';

import { AppLayoutModule } from './app-layout/app-layout.module';
/*
import { ClrControlsModule } from './clr-controls/clr-controls.module';
import { routes as clrControlsRoutes } from './clr-controls/clr-controls.routing.module';
import { routes as clrFormsModuleRoutes } from './clr-forms/clr-forms-routing.module';
import { routes as clrFileUploadRoutes } from './clr-file-upload/clr-file-upload.routing.module';
import { ClrFormsModule } from './clr-forms/clr-forms.module';
import { ClrFileUploadModule } from './clr-file-upload/clr-file-upload.module';
*/
export const routes: Routes = [
    /*
    {
        path: '',
        redirectTo: '/clr-forms/form',
        pathMatch: 'full'
    },
    */
    {
        path: '',
        component: AppLayoutComponent
        /*,
        children: [
            {
                path: 'clr-controls',
                children: clrControlsRoutes
            },
            {
                path: 'clr-forms',
                children: clrFormsModuleRoutes
            },
            {
                path: 'clr-file-upload',
                children: clrFileUploadRoutes
            }
        ]
        */
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), AppLayoutModule /*, ClrControlsModule, ClrFormsModule, ClrFileUploadModule*/
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
