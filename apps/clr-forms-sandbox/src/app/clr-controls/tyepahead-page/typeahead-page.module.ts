import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrTypeaheadModule } from '@ng-holistic/clr-controls';
import { TypeaheadPageComponent } from './typeahead-page.component';

@NgModule({
    declarations: [TypeaheadPageComponent],
    imports: [CommonModule, HlcClrTypeaheadModule],
    exports: []
})
export class TypeaheadPageModule {}
