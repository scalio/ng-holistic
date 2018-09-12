import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TagsListComponent } from './tags-list.component';
import { TypeaheadDirectiveModule } from '@ng-holistic/core';
import { ClrIconModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, TypeaheadDirectiveModule, ClrIconModule],
    declarations: [TagsListComponent],
    exports: [TagsListComponent]
})
export class TagsListModule {
    constructor() {}
}
