import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormModule, InputContainerModule } from '@ng-holistic/clr-forms';
import { FormPageComponent } from './form-page.component';
import { TextModule } from '@ng-holistic/clr-controls';

///
@NgModule({
    declarations: [FormPageComponent],
    imports: [CommonModule, ClrFormModule, InputContainerModule, TextModule],
    exports: []
})
export class FormPageModule {}
