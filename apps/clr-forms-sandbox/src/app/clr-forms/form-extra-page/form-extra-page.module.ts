import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { FormExtraPageComponent } from './form-extra-page.component';

///
@NgModule({
    declarations: [FormExtraPageComponent],
    imports: [CommonModule, HlcClrFormModule],
    exports: []
})
export class FormExtraPageModule {}
