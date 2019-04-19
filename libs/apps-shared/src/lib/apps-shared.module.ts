import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcCodeHighlightDirective } from './code-highlight.directive';
import { HlcCodeRenderExampleComponent } from './code-render-example/code-render-example.component';
import { AppConfigModule } from './config-modal/config-modal.module';

@NgModule({
    imports: [CommonModule, AppConfigModule],
    declarations: [HlcCodeHighlightDirective, HlcCodeRenderExampleComponent],
    exports: [HlcCodeHighlightDirective, HlcCodeRenderExampleComponent]
})
export class AppsSharedModule {}
