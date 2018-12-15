import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { ListPageModule } from './list-page/list-page.module';

export const routes: Routes = [
    {
        path: 'list',
        component: ListPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), ListPageModule],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrListRoutingModule {}
