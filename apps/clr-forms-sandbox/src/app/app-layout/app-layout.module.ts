import { NgModule } from '@angular/core';
import { ClrIconModule, ClrSignpostModule } from '@clr/angular';
import { HlcClrMainHeaderModule, HlcClrMainLayoutModule } from '@ng-holistic/clr-common';
import { AppLayoutComponent } from './app-layout.component';

@NgModule({
    declarations: [AppLayoutComponent],
    imports: [HlcClrMainLayoutModule, HlcClrMainHeaderModule, ClrIconModule, ClrSignpostModule],
    providers: [],
    bootstrap: []
})
export class AppLayoutModule {}
