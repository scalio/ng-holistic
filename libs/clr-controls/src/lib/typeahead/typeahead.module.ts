import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TypeaheadComponent } from './typeahead.component';
import { TypeaheadDirectiveModule } from '@ng-holistic/core';

@NgModule({
    imports: [CommonModule, TypeaheadDirectiveModule],
    declarations: [TypeaheadComponent],
    exports: [TypeaheadComponent]
})
export class TypeaheadModule {
    constructor() {}
}
