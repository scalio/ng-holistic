import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListPageComponent } from './list-page.component';
import { HlcClrListModule } from '@ng-holistic/clr-list';


@NgModule({
    declarations: [ListPageComponent],
    imports: [CommonModule, HlcClrListModule],
    exports: [ListPageComponent]
})
export class ListPageModule {}
