import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { HlcClrListModule } from '@ng-holistic/clr-list';
import { ListPageComponent } from './list-page.component';

@NgModule({
    declarations: [ListPageComponent],
    imports: [CommonModule, HlcClrListModule, AppsSharedModule],
    exports: [ListPageComponent]
})
export class ListPageModule {}
