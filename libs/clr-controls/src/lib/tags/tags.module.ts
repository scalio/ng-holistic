import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TypeaheadModule } from '../typeahead';
import { TagsComponent } from './tags.component';

@NgModule({
    imports: [CommonModule, TypeaheadModule],
    declarations: [TagsComponent],
    exports: [TagsComponent]
})
export class TagsModule {
    constructor() {}
}
