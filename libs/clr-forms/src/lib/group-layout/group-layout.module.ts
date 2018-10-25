import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupsLayoutComponent } from './groups-layout.component';

@NgModule({
    imports: [CommonModule],
    declarations: [GroupsLayoutComponent],
    exports: [GroupsLayoutComponent],
    entryComponents: [GroupsLayoutComponent]
})
export class GroupsLayoutModule {
}
