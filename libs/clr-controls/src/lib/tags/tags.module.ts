import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlcClrTagsListModule } from '../tags-list/tags-list.module';
import { HlcClrTypeaheadModule } from '../typeahead/typeahead.module';
import { HlcClrTagsComponent } from './tags.component';

@NgModule({
    imports: [CommonModule, HlcClrTypeaheadModule, FormsModule, HlcClrTagsListModule],
    declarations: [HlcClrTagsComponent],
    exports: [HlcClrTagsComponent]
})
export class HlcClrTagsModule {
    constructor() {}
}
