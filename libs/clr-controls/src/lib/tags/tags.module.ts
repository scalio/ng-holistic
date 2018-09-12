import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TypeaheadModule } from '../typeahead';
import { TagsComponent } from './tags.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, TypeaheadModule, FormsModule],
    declarations: [TagsComponent],
    exports: [TagsComponent]
})
export class TagsModule {
    constructor() {}
}
