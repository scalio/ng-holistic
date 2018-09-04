import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrTabsModule } from '@clr/angular';
import { FieldsLayoutModule } from './fields-layout/fields-layout.module';
import { GroupsLayoutComponent } from './groups-layout/groups-layout.component';
import { TabsLayoutComponent } from './tabs-layout/tabs-layout.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ClrTabsModule, FieldsLayoutModule],
    declarations: [GroupsLayoutComponent, TabsLayoutComponent, FormLayoutComponent],
    exports: [FormLayoutComponent]
})
export class ClrFormsModule {}
