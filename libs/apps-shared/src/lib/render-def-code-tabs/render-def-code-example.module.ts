import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrTabsModule } from '@clr/angular';
import { CodeHighlight } from '../code-highlight';
import { CodeSnippet } from '../code-snippet';
import { HlcSbxRenderDefCodeComponent } from './render-def-code-example.component';

@NgModule({
    imports: [CommonModule, ClrTabsModule],
    // wrong
    declarations: [HlcSbxRenderDefCodeComponent, CodeSnippet, CodeHighlight],
    exports: [HlcSbxRenderDefCodeComponent, CodeSnippet, CodeHighlight]
})
export class HlcSbxRenderDefCodeModule {}
