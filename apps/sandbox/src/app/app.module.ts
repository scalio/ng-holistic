import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClrLayoutModule, ClrMainContainerModule } from '@clr/angular';
import { NxModule } from '@nrwl/nx';
import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app.routing.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClrMainContainerModule,
        ClrLayoutModule,
        NxModule.forRoot(),
        RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule {
    constructor() {}
}
