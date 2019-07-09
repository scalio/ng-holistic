import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// tslint:disable-next-line:import-spacing
import { TableColumnDefinitionPageComponent } 
    from './table-column-definition-page/table-column-definition-page.component';
import { TableColumnDefinitionPageModule } from './table-column-definition-page/table-column-definition-page.module';
// tslint:disable-next-line:max-line-length
import { TableDataProviderConfigPageComponent } from './table-data-provider-config-page/table-data-provider-config-page.component';
import { TableDataProviderPageComponent } from './table-data-provider-page/table-data-provider-page.component';
import { TableDefinitionPageComponent } from './table-definition-page/table-definition-page.component';
import { TableDefinitionPageModule } from './table-definition-page/table-definition-page.module';
import { TablePageComponent } from './table-page/table-page.component';
import { TablePageModule } from './table-page/table-page.module';
// tslint:disable-next-line:max-line-length
import { TableCustomColumnDefinitionPageComponent } from './table-custom-column-definition-page/table-custom-column-definition-page.component';

export const routes: Routes = [
    {
        path: 'table',
        component: TablePageComponent
    },
    {
        path: 'data-provider',
        component: TableDataProviderPageComponent
    },
    {
        path: 'data-provider-config',
        component: TableDataProviderConfigPageComponent
    },
    {
        path: 'table-definition',
        component: TableDefinitionPageComponent
    },
    {
        path: 'column-definition',
        component: TableColumnDefinitionPageComponent
    },
    {
        path: 'custom-column-definition',
        component: TableCustomColumnDefinitionPageComponent
    },
    {
        path: 'configure-column-definition-map',
        component: TableDefinitionPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        TableDefinitionPageModule,
        TablePageModule,
        TableColumnDefinitionPageModule
    ],
    exports: [RouterModule],
    entryComponents: []
})
export class DocumentationModule {}
