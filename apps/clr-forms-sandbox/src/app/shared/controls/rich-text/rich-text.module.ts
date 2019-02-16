import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { HlcClrRichTextComponent } from './rich-text.component';

@NgModule({
    imports: [CommonModule, QuillModule, ReactiveFormsModule, FormsModule],
    declarations: [HlcClrRichTextComponent],
    exports: [HlcClrRichTextComponent]
})
export class HlcClrRichTextModule {
    constructor() {}
}
