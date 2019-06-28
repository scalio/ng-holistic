import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableDefinitionPageComponent } from './table-definition-page/table-definition-page.component';
import { TableDefinitionPageModule } from './table-definition-page/table-definition-page.module';

export const routes: Routes = [
    {
        path: 'table-definition',
        component: TableDefinitionPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), TableDefinitionPageModule],
    exports: [RouterModule],
    entryComponents: []
})
export class DocumentationModule {}
