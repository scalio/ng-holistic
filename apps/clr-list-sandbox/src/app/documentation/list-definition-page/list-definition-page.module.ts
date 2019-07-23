import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { ListDefinitionPageComponent } from './list-definition-page.component';

@NgModule({
    declarations: [ListDefinitionPageComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule],
    exports: [ListDefinitionPageComponent]
})
export class ListDefinitionPageModule {}
