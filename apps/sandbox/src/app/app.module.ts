import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClrLayoutModule, ClrMainContainerModule } from '@clr/angular';
import { ClrFormModule, InputContainerModule, ValidationErrorsMapConfig } from '@ng-holistic/clr-forms';
import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app.routing.module';

const inputContainerValdationErrorsMapConfig: ValidationErrorsMapConfig = {
    required: container => `Field ${container.label} is required`
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClrMainContainerModule,
        ClrLayoutModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabled', useHash: true }),
        ClrFormModule.forRoot(),
        InputContainerModule.forRoot({ validationErrorsMap: inputContainerValdationErrorsMapConfig })
    ],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule {
    constructor() {}
}
