import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { ClrControlsModule } from './clr-controls/clr-controls.module';
import { routes as clrControlsRoutes } from './clr-controls/clr-controls.routing.module';
import { ClrFileUploadModule } from './clr-file-upload/clr-file-upload.module';
import { routes as clrFileUploadRoutes } from './clr-file-upload/clr-file-upload.routing.module';
import { routes as clrFormsModuleRoutes } from './clr-forms/clr-forms-routing.module';
import { ClrFormsModule } from './clr-forms/clr-forms.module';
import { ClrWizardModule } from './clr-wizard/clr-wizard.module';
import { routes as clrWziardRoutes } from './clr-wizard/clr-wizard.routing.module';
import { DocumentationModule, rootRoutes } from './documentation/documentation.module';
import { GettingStartedModule } from './getting-started/getting-started.module';
import { routes as gettingStartedRoutes } from './getting-started/getting-started.routing.module';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            ...rootRoutes,
            {
                path: 'getting-started',
                children: gettingStartedRoutes
            },
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
            },
            {
                path: 'clr-wizard',
                children: clrWziardRoutes
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        AppLayoutModule,
        GettingStartedModule,
        ClrControlsModule,
        ClrFormsModule,
        ClrFileUploadModule,
        ClrWizardModule,
        DocumentationModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
