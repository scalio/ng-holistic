import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrGroupsLayoutComponent, HlcClrGroupLayoutComponent } from './groups-layout.component';

@NgModule({
    imports: [CommonModule],
    declarations: [HlcClrGroupsLayoutComponent, HlcClrGroupLayoutComponent],
    exports: [HlcClrGroupsLayoutComponent, HlcClrGroupLayoutComponent],
    entryComponents: [HlcClrGroupsLayoutComponent, HlcClrGroupLayoutComponent]
})
export class GroupsLayoutModule {
}
