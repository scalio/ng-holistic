import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseListPageComponent } from './base-list-page.component';
import { ListLayoutModule } from '@ng-holistic/clr-lists';

@NgModule({
    declarations: [BaseListPageComponent],
    imports: [CommonModule, ListLayoutModule],
    exports: [BaseListPageComponent]
})
export class BaseListPageModule {}
