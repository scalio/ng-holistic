import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { TableDataProviderConfigPageComponent } from './table-data-provider-config-page/table-data-provider-config-page.component';
import { TableDataProviderPageComponent } from './table-data-provider-page/table-data-provider-page.component';
import { TableDefinitionPageComponent } from './table-definition-page/table-definition-page.component';
import { TableDefinitionPageModule } from './table-definition-page/table-definition-page.module';
import { TablePageComponent } from './table-page/table-page.component';
import { TablePageModule } from './table-page/table-page.module';

export const routes: Routes = [
    {
        path: 'table',
        component: TablePageComponent
    },
    {
        path: 'table-data-provider',
        component: TableDataProviderPageComponent
    },
    {
        path: 'table-data-provider-config',
        component: TableDataProviderConfigPageComponent
    },
    {
        path: 'table-definition',
        component: TableDefinitionPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), TableDefinitionPageModule, TablePageModule],
    exports: [RouterModule],
    entryComponents: []
})
export class DocumentationModule {}
