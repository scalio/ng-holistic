import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxesComponent } from './checkboxes.component';
import { ClrCheckboxModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, ClrCheckboxModule],
    declarations: [CheckboxesComponent],
    exports: [CheckboxesComponent]
})
export class CheckboxesModule {
    constructor() {}
}
