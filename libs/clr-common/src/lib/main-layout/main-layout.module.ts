import { NgModule } from '@angular/core';
import { ClrMainContainerModule } from '@clr/angular';
import { HlcClrSideNavModule } from '../side-nav/side-nav.module';
import { HlcClrMainLayoutComponent } from './main-layout.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, ClrMainContainerModule, HlcClrSideNavModule],
    declarations: [HlcClrMainLayoutComponent],
    exports: [HlcClrMainLayoutComponent]
})
export class HlcClrMainLayoutModule {
    constructor() {}
}
