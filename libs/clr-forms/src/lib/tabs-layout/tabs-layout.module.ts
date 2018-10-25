import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrTabsModule } from '@clr/angular';
import { TabsLayoutComponent } from './tabs-layout.component';

@NgModule({
    imports: [CommonModule, ClrTabsModule],
    declarations: [TabsLayoutComponent],
    exports: [TabsLayoutComponent],
    entryComponents: [TabsLayoutComponent]
})
export class TabsLayoutModule {}
