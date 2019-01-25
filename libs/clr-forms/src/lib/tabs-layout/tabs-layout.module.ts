import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule, ClrTabsModule, ClrTooltipModule } from '@clr/angular';
import { TabLayoutComponent, HlcClrTabsLayoutComponent } from './tabs-layout.component';

@NgModule({
    imports: [CommonModule, ClrTabsModule, ClrIconModule, ClrTooltipModule],
    declarations: [HlcClrTabsLayoutComponent, TabLayoutComponent],
    exports: [HlcClrTabsLayoutComponent, TabLayoutComponent],
    entryComponents: [HlcClrTabsLayoutComponent, TabLayoutComponent]
})
export class HlcClrTabsLayoutModule {}
