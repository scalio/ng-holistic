import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainLayoutComponent } from './main-layout.component';
import { ClrMainContainerModule } from '@clr/angular';
import { SideNavModule } from '../side-nav';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [BrowserModule, ClrMainContainerModule, SideNavModule, RouterModule],
    declarations: [MainLayoutComponent],
    exports: [MainLayoutComponent]
})
export class MainLayoutModule {
    constructor() {}
}
