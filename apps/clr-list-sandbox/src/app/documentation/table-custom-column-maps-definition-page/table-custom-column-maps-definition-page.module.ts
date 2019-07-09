import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { TableCustomColumnMapsDefinitionPageComponent } from './table-custom-column-maps-definition-page.component';

@NgModule({
    declarations: [TableCustomColumnMapsDefinitionPageComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule],
    exports: [TableCustomColumnMapsDefinitionPageComponent]
})
export class TableCustomColumnMapsDefinitionPageModule {}
