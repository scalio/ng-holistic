import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClrLayoutModule, ClrMainContainerModule } from '@clr/angular';
import { NgrxFormsModule, PreloadItemConfig } from '@ng-holistic/ngrx-forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { DndModule } from 'ng2-dnd';
import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app.routing.module';
import { ClrFormsModule } from '@ng-holistic/clr-forms';

const preloadItemConfig: PreloadItemConfig = {
    getItemId(_) {
        // fake
        return 0;
    }
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClrMainContainerModule,
        ClrLayoutModule,
        NxModule.forRoot(),
        RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument(),
        DndModule.forRoot(),
        ClrFormsModule.forRoot(),
        NgrxFormsModule.forRoot(preloadItemConfig)
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule {
    constructor() {}
}
