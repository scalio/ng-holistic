import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app.routing.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppLayoutModule,
        AppRoutingModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabled', useHash: true })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
