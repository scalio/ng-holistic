import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './app-layout.component';
import { HlcClrMainLayoutModule, HlcClrMainHeaderModule } from '@ng-holistic/clr-common';

@NgModule({
    declarations: [AppLayoutComponent],
    imports: [HlcClrMainLayoutModule, HlcClrMainHeaderModule],
    providers: [],
    bootstrap: []
})
export class AppLayoutModule {}
