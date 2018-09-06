import { NgModule } from '@angular/core';
import {DndModule} from 'ng2-dnd';
import { OrderedListComponent } from './ordered-list.component';
import { CommonModule } from '@angular/common';
import { ClrIconModule } from '@clr/angular';
import { LayoutTriggerModule } from '@ng-holistic/core';

@NgModule({
    imports: [CommonModule, DndModule, ClrIconModule, LayoutTriggerModule],
    declarations: [OrderedListComponent],
    exports: [OrderedListComponent],
    providers: []
})
export class OrderedListModule {
    constructor() {}
}
