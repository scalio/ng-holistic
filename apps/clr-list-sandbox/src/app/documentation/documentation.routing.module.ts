import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableDefinitionPageComponent } from './table-definition-page/table-definition-page.component';
import { TableDefinitionPageModule } from './table-definition-page/table-definition-page.module';
import { TablePageModule } from './table-page/table-page.module';
import { TablePageComponent } from './table-page/table-page.component';

export const routes: Routes = [
    {
        path: 'table',
        component: TablePageComponent
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
