import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { TableCustomColumnDefinitionPageComponent } from './table-custom-column-definition-page.component';

@NgModule({
    declarations: [TableCustomColumnDefinitionPageComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule],
    exports: [TableCustomColumnDefinitionPageComponent]
})
export class TableCustomColumnDefinitionPageModule {}
