import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderedListModule } from '@ng-holistic/clr-controls';
import { OrderedListPageComponent } from './ordered-list-page.component';

@NgModule({
    declarations: [OrderedListPageComponent],
    imports: [CommonModule, OrderedListModule],
    exports: [OrderedListPageComponent]
})
export class OrderedListPageModule {}
