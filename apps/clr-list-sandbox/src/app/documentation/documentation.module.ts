import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableDefinitionPageModule } from './table-definition-page/table-definition-page.module';
import { TablePageModule } from './table-page/table-page.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, TableDefinitionPageModule, TablePageModule]
})
export class DocumentationModule {}
