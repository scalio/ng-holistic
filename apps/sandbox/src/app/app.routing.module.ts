import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { ClrControlsComponent } from './clr-controls/clr-controls.component';
import { ClrControlsModule } from './clr-controls/clr-controls.module';
import { routes as clrControlsRoutes } from './clr-controls/clr-controls.routing.module';
import { ClrListsModule } from './clr-lists/clr-lists.module';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/clr-controls',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: 'clr-controls',
                component: ClrControlsComponent,
                children: clrControlsRoutes
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), ClrControlsModule, AppLayoutModule, ClrListsModule],
    exports: [RouterModule]
})
export class AppRoutingModule {}
