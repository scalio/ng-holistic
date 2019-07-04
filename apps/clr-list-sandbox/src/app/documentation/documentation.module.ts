import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableDefinitionPageModule } from './table-definition-page/table-definition-page.module';
import { TablePageModule } from './table-page/table-page.module';
import { TableDataProviderPageModule } from './table-data-provider-page/table-data-provider-page.module';
// tslint:disable-next-line:max-line-length
import { TableDataProviderConfigPageModule } from './table-data-provider-config-page/table-data-provider-config-page.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TableDefinitionPageModule,
        TablePageModule,
        TableDataProviderPageModule,
        TableDataProviderConfigPageModule
    ]
})
export class DocumentationModule {}
