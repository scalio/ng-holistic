import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { TableDefinitionPageComponent } from './table-definition-page.component';

@NgModule({
    declarations: [TableDefinitionPageComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule],
    exports: [TableDefinitionPageComponent]
})
export class TableDefinitionPageModule {}
