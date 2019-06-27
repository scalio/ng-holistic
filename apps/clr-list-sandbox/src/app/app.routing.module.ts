import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { ClrFilterModule } from './clr-filter/clr-filter.module';
import { routes as clrFilterRoutes } from './clr-filter/clr-filter.routing.module';
import { ClrListModule } from './clr-list/clr-list.module';
import { routes as clrListRoutes } from './clr-list/clr-list.routing.module';
// tslint:disable-next-line:max-line-length
import { TableDefinitionPageComponent } from './clr-table-definition/table-definition-page/table-definition-page.component';
import { ClrTableModule } from './clr-table/clr-table.module';
import { routes as clrTableRoutes } from './clr-table/clr-table.routing.module';
import { TableDefinitionPageModule } from './clr-table-definition/table-definition-page/table-definition-page.module';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/clr-table/table',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: 'clr-table-definition',
                component: TableDefinitionPageComponent
            },
            {
                path: 'clr-filter',
                children: clrFilterRoutes
            },
            {
                path: 'clr-table',
                children: clrTableRoutes
            },
            {
                path: 'clr-list',
                children: clrListRoutes
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        AppLayoutModule,
        ClrTableModule,
        ClrFilterModule,
        ClrListModule,
        TableDefinitionPageModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
