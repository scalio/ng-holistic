import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClrLayoutModule, ClrMainContainerModule } from '@clr/angular';
import { ClrFormModule } from '@ng-holistic/clr-forms';
import { i18nConfigProviders } from './app-i18n.config';
import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app.routing.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClrMainContainerModule,
        ClrLayoutModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabled', useHash: true }),
        ClrFormModule.forRoot()
    ],
    bootstrap: [AppComponent],
    entryComponents: [],
    providers: [...i18nConfigProviders]
})
export class AppModule {
    constructor() {}
}
