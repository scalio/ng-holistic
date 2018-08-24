import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseListPageModule } from './base-list-page/base-list-page.module';
import { BaseListPageComponent } from './base-list-page/base-list-page.component';

export const routes: Routes = [
    {
        path: 'base',
        component: BaseListPageComponent
    },
    {
        path: '',
        component: BaseListPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), BaseListPageModule],
    exports: [RouterModule]
})
export class ClrListsRoutingModule {}
