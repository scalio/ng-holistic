import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './app-layout.component';
import { MainLayoutModule, MainHeaderModule } from '@ng-holistic/clr-common';

@NgModule({
    declarations: [AppLayoutComponent],
    imports: [MainLayoutModule, MainHeaderModule],
    providers: [],
    bootstrap: []
})
export class AppLayoutModule {}
