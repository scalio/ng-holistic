import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainLayoutComponent } from './main-layout.component';
import { ClrMainContainerModule } from '@clr/angular';
import { HlcClrSideNavModule } from '../side-nav/side-nav.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [BrowserModule, ClrMainContainerModule, HlcClrSideNavModule, RouterModule],
    declarations: [MainLayoutComponent],
    exports: [MainLayoutComponent]
})
export class HlcClrMainLayoutModule {
    constructor() {}
}
