import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabsLayoutComponent } from './tabs-layout.component';
import { ClrTabsModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, ClrTabsModule],
    declarations: [TabsLayoutComponent],
    exports: [TabsLayoutComponent],
    entryComponents: [TabsLayoutComponent]
})
export class TabsLayoutModule {
}
