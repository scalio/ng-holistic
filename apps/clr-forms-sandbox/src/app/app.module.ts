import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClrLayoutModule, ClrMainContainerModule } from '@clr/angular';
import { HlcClrImageUploadComponent, HlcClrImageUploadModule } from '@ng-holistic/clr-file-upload';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app.routing.module';
import { hlcConfigProviders } from './hlc.config';
import { HlcClrRichTextComponent, HlcClrRichTextModule } from './shared';

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
            ImageUploadField: HlcClrImageUploadComponent
        }),
        HlcClrRichTextModule,
        HlcClrImageUploadModule
    ],
    bootstrap: [AppComponent],
    entryComponents: [HlcClrRichTextComponent, HlcClrImageUploadComponent],
    providers: [...hlcConfigProviders]
})
export class AppModule {
    constructor() {}
}
