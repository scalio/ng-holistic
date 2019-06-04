import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './app-layout.component';
import { HlcClrMainLayoutModule, HlcClrMainHeaderModule } from '@ng-holistic/clr-common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AppLayoutComponent],
    imports: [HlcClrMainLayoutModule, HlcClrMainHeaderModule, RouterModule],
    providers: [],
    bootstrap: []
})
export class AppLayoutModule {}
