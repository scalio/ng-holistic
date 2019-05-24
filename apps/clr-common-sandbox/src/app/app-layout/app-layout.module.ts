import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HlcClrMainHeaderModule, HlcClrMainLayoutModule } from '@ng-holistic/clr-common';
import { AppLayoutComponent } from './app-layout.component';

@NgModule({
    declarations: [AppLayoutComponent],
    imports: [HlcClrMainLayoutModule, HlcClrMainHeaderModule, RouterModule],
    providers: [],
    bootstrap: []
})
export class AppLayoutModule {}
