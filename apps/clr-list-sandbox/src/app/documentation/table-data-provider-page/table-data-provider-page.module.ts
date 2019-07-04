import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { TableDataProviderPageComponent } from './table-data-provider-page.component';

@NgModule({
    declarations: [TableDataProviderPageComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule],
    exports: [TableDataProviderPageComponent]
})
export class TableDataProviderPageModule {}
