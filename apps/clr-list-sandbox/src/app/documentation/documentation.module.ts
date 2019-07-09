import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableDefinitionPageModule } from './table-definition-page/table-definition-page.module';
import { TablePageModule } from './table-page/table-page.module';
import { TableDataProviderPageModule } from './table-data-provider-page/table-data-provider-page.module';
// tslint:disable-next-line:max-line-length
import { TableDataProviderConfigPageModule } from './table-data-provider-config-page/table-data-provider-config-page.module';
import { TableColumnDefinitionPageModule } from './table-column-definition-page/table-column-definition-page.module';
// tslint:disable-next-line:max-line-length
import { TableCustomColumnDefinitionPageModule } from './table-custom-column-definition-page/table-custom-column-definition-page.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TableDefinitionPageModule,
        TablePageModule,
        TableDataProviderPageModule,
        TableDataProviderConfigPageModule,
        TableColumnDefinitionPageModule,
        TableCustomColumnDefinitionPageModule
    ]
})
export class DocumentationModule {}
