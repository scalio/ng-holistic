import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule, ClrTabsModule, ClrTooltipModule } from '@clr/angular';
import { TabLayoutComponent, TabsLayoutComponent } from './tabs-layout.component';

@NgModule({
    imports: [CommonModule, ClrTabsModule, ClrIconModule, ClrTooltipModule],
    declarations: [TabsLayoutComponent, TabLayoutComponent],
    exports: [TabsLayoutComponent, TabLayoutComponent],
    entryComponents: [TabsLayoutComponent, TabLayoutComponent]
})
export class HlcClrTabsLayoutModule {}
