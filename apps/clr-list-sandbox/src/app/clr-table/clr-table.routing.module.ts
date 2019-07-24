import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesTablePageComponent } from './invoices-table-page/invoices-table-page.component';
import { InvoicesTablePageModule } from './invoices-table-page/invoices-table-page.module';
import { TableExpandRowCardPageComponent } from './table-expand-row-card-page/table-expand-row-card-page.component';
import { TableExpandRowCardPageModule } from './table-expand-row-card-page/table-expand-row-card-page.module';
import { TableExpandRowPageComponent } from './table-expand-row-page/table-expand-row-page.component';
import { TableExpandRowPageModule } from './table-expand-row-page/table-expand-row-page.module';
import { TablePageComponent } from './table-page/table-page.component';
import { TablePageModule } from './table-page/table-page.module';
import { TableReduxPageComponent } from './table-redux-page/table-redux-page.component';
import { TableReduxPageModule } from './table-redux-page/table-redux-page.module';
import { TableRowActionsPageComponent } from './table-row-actions-page/table-row-actions-page.component';
import { TableRowActionsPageModule } from './table-row-actions-page/table-row-actions-page.module';
import { TableSelectRowsPageComponent } from './table-select-rows-page/table-select-rows-page.component';
import { TableSelectRowsPageModule } from './table-select-rows-page/table-select-rows-page.module';

export const routes: Routes = [
    {
        path: 'invoices',
        component: InvoicesTablePageComponent
    },
    {
        path: 'table',
        component: TablePageComponent
    },
    {
        path: 'table-expand-row',
        component: TableExpandRowPageComponent
    },
    {
        path: 'table-expand-row-card',
        component: TableExpandRowCardPageComponent
    },
    {
        path: 'table-select-rows',
        component: TableSelectRowsPageComponent
    },
    {
        path: 'table-row-actions',
        component: TableRowActionsPageComponent
    },
    {
        path: 'table-redux',
        component: TableReduxPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        TablePageModule,
        TableReduxPageModule,
        TableExpandRowPageModule,
        TableExpandRowCardPageModule,
        TableSelectRowsPageModule,
        TableRowActionsPageModule,
        InvoicesTablePageModule
    ],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrTableRoutingModule {}
