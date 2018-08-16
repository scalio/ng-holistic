import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { LolComponent } from './lol/lol.component';

@NgModule({
    declarations: [AppComponent, ListComponent, LolComponent],
    imports: [BrowserModule, NxModule.forRoot(), RouterModule.forRoot([], { initialNavigation: 'enabled' })],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
