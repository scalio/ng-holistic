import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseFormPageModule } from './base-form-page/base-form-page.module';
import { BaseFormPageComponent } from './base-form-page/base-form-page.component';

export const routes: Routes = [
    {
        path: 'base',
        component: BaseFormPageComponent
    },
    {
        path: '',
        component: BaseFormPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), BaseFormPageModule],
    exports: [RouterModule]
})
export class ClrFormsRoutingModule {}
