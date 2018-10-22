import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormsModule } from '@ng-holistic/clr-forms';
import { FormPageComponent } from './form-page.component';

///
@NgModule({
    declarations: [FormPageComponent],
    imports: [CommonModule, ClrFormsModule],
    exports: []
})
export class FormPageModule {}
