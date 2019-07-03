import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { TablePageComponent } from './table-page.component';

@NgModule({
    declarations: [TablePageComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule],
    exports: [TablePageComponent]
})
export class TablePageModule {}
