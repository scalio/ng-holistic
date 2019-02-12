import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrTypeaheadComponent } from './typeahead.component';
import { HlcTypeaheadDirectiveModule } from '@ng-holistic/typeahead';

@NgModule({
    imports: [CommonModule, HlcTypeaheadDirectiveModule],
    declarations: [HlcClrTypeaheadComponent],
    exports: [HlcClrTypeaheadComponent],
})
export class HlcClrTypeaheadModule {
    constructor() {}
}
