import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClrLayoutModule, ClrMainContainerModule } from '@clr/angular';
import {
    HlcClrDocumentUploadComponent,
    HlcClrDocumentUploadModule,
    HlcClrFileUploadComponent,
    HlcClrFileUploadModule,
    HlcClrImageUploadComponent,
    HlcClrImageUploadModule
} from '@ng-holistic/clr-file-upload';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app.routing.module';
import { hlcConfigProviders } from './hlc.config';
import { HlcClrRichTextComponent, HlcClrRichTextModule } from './shared';
import { HlcNgSelectComponent, HlcNgSelectModule } from '@ng-holistic/ng-select';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClrMainContainerModule,
        ClrLayoutModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabled', useHash: true }),
        HlcClrFormModule.forRoot({
            RichTextField: HlcClrRichTextComponent,
            ImageUploadField: HlcClrImageUploadComponent,
            FileUploadField: HlcClrFileUploadComponent,
            DocumentUploadField: HlcClrDocumentUploadComponent,
            NgSelectField: HlcNgSelectComponent
        }),
        HlcClrRichTextModule,
        HlcClrImageUploadModule,
        HlcClrFileUploadModule,
        HlcClrDocumentUploadModule,
        HlcNgSelectModule
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        HlcClrRichTextComponent,
        HlcClrImageUploadComponent,
        HlcClrDocumentUploadComponent,
        HlcNgSelectComponent
    ],
    providers: [...hlcConfigProviders]
})
export class AppModule {
    constructor() {}
}
