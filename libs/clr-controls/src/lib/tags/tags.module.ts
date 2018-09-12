import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { TagsComponent } from './tags.component';

@NgModule({
    imports: [CommonModule, FormsModule, TagInputModule, BrowserAnimationsModule],
    declarations: [TagsComponent],
    exports: [TagsComponent],
})
export class TagsModule {
    constructor() {}
}
