import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormModule } from '@ng-holistic/clr-forms';
import { FormPageComponent } from './form-page.component';
import { ExampleSourceModule } from '../../example-source';

///
@NgModule({
    declarations: [FormPageComponent],
    imports: [CommonModule, ExampleSourceModule, ClrFormModule],
    exports: []
})
export class FormPageModule {}
