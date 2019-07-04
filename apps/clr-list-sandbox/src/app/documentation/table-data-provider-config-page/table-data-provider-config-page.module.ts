import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { TableDataProviderConfigPageComponent } from './table-data-provider-config-page.component';

@NgModule({
    declarations: [TableDataProviderConfigPageComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule],
    exports: [TableDataProviderConfigPageComponent]
})
export class TableDataProviderConfigPageModule {}
