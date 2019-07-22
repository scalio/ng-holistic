import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcCodeHighlightDirective, HlcCodeHighlightModule } from './code-highlight.directive';
import { HlcCodeRenderExampleComponent } from './code-render-example/code-render-example.component';
import { AppConfigModule } from './config-modal/config-modal.module';
import { HlcSbxExampleLinkButtonModule } from './example-link-button/example-link-button.module';
import { HlcFormValueModule } from './form-value/form-value.module';
import { HlcPrettyJsonModule } from './pretty-json.pipe';
import { HlcSbxRenderDefCodeModule } from './render-def-code-tabs/render-def-code-example.module';
import { CodeHighlight } from './code-highlight';
import { CodeSnippet } from './code-snippet';

@NgModule({
    imports: [
        CommonModule,
        AppConfigModule,
        HlcSbxRenderDefCodeModule,
        HlcCodeHighlightModule,
        HlcPrettyJsonModule,
        HlcFormValueModule,
        HlcSbxExampleLinkButtonModule
    ],
    declarations: [HlcCodeRenderExampleComponent, CodeHighlight, CodeSnippet],
    exports: [
        HlcCodeHighlightDirective,
        HlcCodeRenderExampleComponent,
        HlcSbxRenderDefCodeModule,
        HlcCodeHighlightModule,
        HlcPrettyJsonModule,
        HlcFormValueModule,
        HlcSbxExampleLinkButtonModule,
        CodeSnippet
    ]
})
export class AppsSharedModule {}
