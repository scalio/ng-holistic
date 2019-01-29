import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { HlcAsideModule } from '../aside/aside.module';
import { HlcClrAsidePanelComponent } from './aside-panel.component';

@NgModule({
    declarations: [HlcClrAsidePanelComponent],
    exports: [HlcClrAsidePanelComponent],
    imports: [BrowserModule, CommonModule, ClarityModule, HlcAsideModule],
    providers: []
})
export class HlcClrAsidePanelModule {}
