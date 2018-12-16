import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { routes as clrTableRoutes } from './clr-table/clr-table.routing.module';
import { routes as clrFilterRoutes } from './clr-filter/clr-filter.routing.module';
import { routes as clrListRoutes } from './clr-list/clr-list.routing.module';
import { ClrTableModule } from './clr-table/clr-table.module';
import { ClrFilterModule } from './clr-filter/clr-filter.module';
import { ClrListModule } from './clr-list/clr-list.module';

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
                path: 'clr-filter',
                children: clrFilterRoutes
            }
        ]
    },
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: 'clr-table',
                children: clrTableRoutes
            }
        ]
    },
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: 'clr-list',
                children: clrListRoutes
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), AppLayoutModule, ClrTableModule, ClrFilterModule, ClrListModule],
    exports: [RouterModule]
})
export class AppRoutingModule {}
