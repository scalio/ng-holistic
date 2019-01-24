import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrTabsModule, ClrIconModule, ClrTooltipModule } from '@clr/angular';
import { TabsLayoutComponent } from './tabs-layout.component';

@NgModule({
    imports: [CommonModule, ClrTabsModule, ClrIconModule, ClrTooltipModule],
    declarations: [TabsLayoutComponent],
    exports: [TabsLayoutComponent],
    entryComponents: [TabsLayoutComponent]
})
export class HlcClrTabsLayoutModule {}
