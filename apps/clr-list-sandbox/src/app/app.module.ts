import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { HlcClrFilterModule, HlcClrTableModule } from '@ng-holistic/clr-list';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], { initialNavigation: 'enabled' }),
        AppRoutingModule,
        HlcClrTableModule.forRoot(),
        HlcClrFilterModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
