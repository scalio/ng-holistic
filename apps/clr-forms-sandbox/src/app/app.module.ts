import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClrLayoutModule, ClrMainContainerModule } from '@clr/angular';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app.routing.module';
import { hlcConfigProviders } from './hlc.config';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClrMainContainerModule,
        ClrLayoutModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabled', useHash: true }),
        HlcClrFormModule.forRoot()
    ],
    bootstrap: [AppComponent],
    entryComponents: [],
    providers: [...hlcConfigProviders]
})
export class AppModule {
    constructor() {}
}
