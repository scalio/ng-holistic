import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { TableDefinitionPageComponent } from './table-definition-page.component';

@NgModule({
    declarations: [TableDefinitionPageComponent],
    imports: [CommonModule, AppsSharedModule],
    exports: [TableDefinitionPageComponent]
})
export class TableDefinitionPageModule {}
