import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClrLayoutModule, ClrMainContainerModule } from '@clr/angular';
import { SideNavModule } from '@ng-holistic/clr-misc';
import { NxModule } from '@nrwl/nx';
import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app.routing.module';
import { ClrControlsModule } from './clr-controls/clr-controls.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClrMainContainerModule,
        ClrLayoutModule,
        NxModule.forRoot(),
        RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
        ClrControlsModule,
        SideNavModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {}
}
