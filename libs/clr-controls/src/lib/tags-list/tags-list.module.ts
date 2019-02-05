import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { HlcClrTagsListComponent } from './tags-list.component';

@NgModule({
    imports: [CommonModule, ClrIconModule],
    declarations: [HlcClrTagsListComponent],
    exports: [HlcClrTagsListComponent]
})
export class HlcClrTagsListModule {
    constructor() {}
}
