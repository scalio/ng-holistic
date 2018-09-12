import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TypeaheadModule } from '../typeahead';
import { TagsComponent } from './tags.component';
import { FormsModule } from '@angular/forms';
import { TagsListModule } from '../tags-list';

@NgModule({
    imports: [CommonModule, TypeaheadModule, FormsModule, TagsListModule],
    declarations: [TagsComponent],
    exports: [TagsComponent]
})
export class TagsModule {
    constructor() {}
}
