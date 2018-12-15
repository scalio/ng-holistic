import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablePageComponent } from './table-page/table-page.component';
import { TablePageModule } from './table-page/table-page.module';
import { TableReduxPageComponent } from './table-redux-page/table-redux-page.component';
import { TableReduxPageModule } from './table-redux-page/table-redux-page.module';

export const routes: Routes = [
    {
        path: 'table',
        component: TablePageComponent
    },
    {
        path: 'table-redux',
        component: TableReduxPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), TablePageModule, TableReduxPageModule],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrTableRoutingModule {}
