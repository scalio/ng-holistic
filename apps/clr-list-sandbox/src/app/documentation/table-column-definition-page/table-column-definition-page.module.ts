import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { TableColumnDefinitionPageComponent } from './table-column-definition-page.component';

@NgModule({
    declarations: [TableColumnDefinitionPageComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule],
    exports: [TableColumnDefinitionPageComponent]
})
export class TableColumnDefinitionPageModule {}
