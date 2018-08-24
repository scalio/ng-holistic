import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClrControlsComponent } from './clr-controls/clr-controls.component';
import { ClrControlsModule } from './clr-controls/clr-controls.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppLayoutModule } from './app-layout/app-layout.module';

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
                component: ClrControlsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), ClrControlsModule, AppLayoutModule],
    exports: [RouterModule]
})
export class AppRoutingModule {}
