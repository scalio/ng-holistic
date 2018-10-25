import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupsLayoutComponent, GroupLayoutComponent } from './groups-layout.component';

@NgModule({
    imports: [CommonModule],
    declarations: [GroupsLayoutComponent, GroupLayoutComponent],
    exports: [GroupsLayoutComponent, GroupLayoutComponent],
    entryComponents: [GroupsLayoutComponent, GroupLayoutComponent]
})
export class GroupsLayoutModule {
}
