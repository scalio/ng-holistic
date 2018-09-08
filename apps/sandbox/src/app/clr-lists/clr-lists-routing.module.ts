import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseListPageModule } from './base-list-page/base-list-page.module';
import { BaseListPageComponent } from './base-list-page/base-list-page.component';
import { NgrxListPageComponent } from './ngrx-list-page/ngrx-list-page.component';
import { NgrxListPageModule } from './ngrx-list-page/ngrx-list-page.module';

export const routes: Routes = [
    {
        path: 'base',
        component: BaseListPageComponent
    },
    {
        path: 'ngrx',
        component: NgrxListPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), BaseListPageModule, NgrxListPageModule],
    exports: [RouterModule]
})
export class ClrListsRoutingModule {}
