import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcCodeHighlightDirective } from './code-highlight.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [HlcCodeHighlightDirective],
    exports: [HlcCodeHighlightDirective]
})
export class AppsSharedModule {}
