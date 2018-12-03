import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormModule, FormFooterModule } from '@ng-holistic/clr-forms';
import { FormPageComponent } from './form-page.component';
import { ExampleSourceModule } from '../../example-source';

///
@NgModule({
    declarations: [FormPageComponent],
    imports: [CommonModule, ExampleSourceModule, ClrFormModule, FormFooterModule],
    exports: []
})
export class FormPageModule {}
