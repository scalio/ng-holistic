import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcCodeHighlightDirective, HlcCodeHighlightModule } from './code-highlight.directive';
import { HlcCodeRenderExampleComponent } from './code-render-example/code-render-example.component';
import { AppConfigModule } from './config-modal/config-modal.module';
import { HlcSbxRenderDefCodeModule } from './render-def-code-tabs/render-def-code-example.module';

@NgModule({
    imports: [CommonModule, AppConfigModule, HlcSbxRenderDefCodeModule, HlcCodeHighlightModule],
    declarations: [HlcCodeRenderExampleComponent],
    exports: [
        HlcCodeHighlightDirective,
        HlcCodeRenderExampleComponent,
        HlcSbxRenderDefCodeModule,
        HlcCodeHighlightModule
    ]
})
export class AppsSharedModule {}
