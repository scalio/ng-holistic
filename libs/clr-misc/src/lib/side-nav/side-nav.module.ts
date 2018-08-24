import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClrIconModule, ClrVerticalNavModule, ClrNavigationModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav.component';
import { RouterModule } from '@angular/router';

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
export class SideNavModule {
    constructor() {}
}
