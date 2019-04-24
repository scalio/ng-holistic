import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcCodeHighlightDirective, HlcCodeHighlightModule } from './code-highlight.directive';
import { HlcCodeRenderExampleComponent } from './code-render-example/code-render-example.component';
import { AppConfigModule } from './config-modal/config-modal.module';
import { HlcFormValueModule } from './form-value/form-value.module';
import { HlcPrettyJsonModule } from './pretty-json.pipe';
import { HlcSbxRenderDefCodeModule } from './render-def-code-tabs/render-def-code-example.module';

@NgModule({
    imports: [
        CommonModule,
        AppConfigModule,
        HlcSbxRenderDefCodeModule,
        HlcCodeHighlightModule,
        HlcPrettyJsonModule,
        HlcFormValueModule
    ],
    declarations: [HlcCodeRenderExampleComponent],
    exports: [
        HlcCodeHighlightDirective,
        HlcCodeRenderExampleComponent,
        HlcSbxRenderDefCodeModule,
        HlcCodeHighlightModule,
        HlcPrettyJsonModule,
        HlcFormValueModule
    ]
})
export class AppsSharedModule {}
