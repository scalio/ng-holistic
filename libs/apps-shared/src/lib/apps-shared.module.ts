import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcCodeHighlightDirective } from './code-highlight.directive';
import { HlcCodeRenderExampleComponent } from './code-render-example/code-render-example.component';

@NgModule({
    imports: [CommonModule],
    declarations: [HlcCodeHighlightDirective, HlcCodeRenderExampleComponent],
    exports: [HlcCodeHighlightDirective, HlcCodeRenderExampleComponent]
})
export class AppsSharedModule {}
