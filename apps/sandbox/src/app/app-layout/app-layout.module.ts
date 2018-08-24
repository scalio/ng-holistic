import { NgModule } from '@angular/core';
import { MainLayoutModule, MainHeaderModule } from '@ng-holistic/clr-layout';
import { AppLayoutComponent } from './app-layout.component';

@NgModule({
    declarations: [AppLayoutComponent],
    imports: [MainLayoutModule, MainHeaderModule],
    providers: [],
    bootstrap: []
})
export class AppLayoutModule {}
