import { NgModule } from '@angular/core';
import { OrderedListComponent } from './ordered-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [OrderedListComponent],
    exports: [OrderedListComponent],
    providers: []
})
export class OrderedListModule {
    constructor() {}
}
