import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ClrIconModule, ClrNavigationModule, ClrVerticalNavModule } from '@clr/angular';
import { SideNavComponent } from './side-nav.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ClrIconModule,
        ClrVerticalNavModule,
        RouterModule,
        ClrNavigationModule
    ],
    declarations: [SideNavComponent],
    exports: [SideNavComponent]
})
export class HlcClrSideNavModule {
    constructor() {}
}
