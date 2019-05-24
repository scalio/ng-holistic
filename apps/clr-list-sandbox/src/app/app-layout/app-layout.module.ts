import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClrIconModule } from '@clr/angular';
import { HlcClrMainHeaderModule, HlcClrMainLayoutModule } from '@ng-holistic/clr-common';
import { AppLayoutComponent } from './app-layout.component';

@NgModule({
    declarations: [AppLayoutComponent],
    imports: [HlcClrMainLayoutModule, HlcClrMainHeaderModule, RouterModule, ClrIconModule],
    providers: [],
    bootstrap: []
})
export class AppLayoutModule {}
