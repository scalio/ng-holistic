import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClrControlsComponent } from './clr-controls/clr-controls.component';

export const routes: Routes = [
    {
        path: 'clr-controls',
        component: ClrControlsComponent
    },
    {
        path: '',
        redirectTo: '/clr-controls',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
