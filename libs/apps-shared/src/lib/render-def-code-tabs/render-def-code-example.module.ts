import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrTabsModule } from '@clr/angular';
import { HlcCodeHighlightModule } from '../code-highlight.directive';
import { HlcSbxRenderDefCodeComponent } from './render-def-code-example.component';

@NgModule({
    imports: [CommonModule, ClrTabsModule, HlcCodeHighlightModule],
    declarations: [HlcSbxRenderDefCodeComponent],
    exports: [HlcSbxRenderDefCodeComponent]
})
export class HlcSbxRenderDefCodeModule {}
