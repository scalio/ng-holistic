import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClrLayoutModule, ClrMainContainerModule } from '@clr/angular';
import { ClrFormModule, InputContainerModule, ValidationErrorsMapConfig } from '@ng-holistic/clr-forms';
import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app.routing.module';
import { DATE_CONFIG } from '@ng-holistic/clr-controls';

const inputContainerValdationErrorsMapConfig: ValidationErrorsMapConfig = {
    required(container) {
        return `Field ${container.label} is required`;
    }
};

export function getDateConfig(localeId: string) {
    /**
     * When application build with i18n-locale=ru all date components placeholders will have in correct format
     */
    return {
        // for ru locale use specific date placeholder
        placeholder: localeId === 'ru' ? 'ДД.ММ.ГГГГ' : undefined
    };
}

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
    entryComponents: [],
    providers: [
        {
            provide: DATE_CONFIG,
            useFactory: getDateConfig,
            deps: [LOCALE_ID]
        }
    ]
})
export class AppModule {
    constructor() {}
}
