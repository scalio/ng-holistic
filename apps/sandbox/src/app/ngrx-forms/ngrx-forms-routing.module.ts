import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseFormPageModule } from './ngrx-form-page/ngrx-form-page.module';
import { NgrxFormPageComponent } from './ngrx-form-page/ngrx-form-page.component';

export const routes: Routes = [
    {
        path: 'base',
        component: NgrxFormPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), BaseFormPageModule],
    exports: [RouterModule]
})
export class ClrFormsRoutingModule {}
