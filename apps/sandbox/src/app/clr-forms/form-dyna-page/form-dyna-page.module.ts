import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormModule } from '@ng-holistic/clr-forms';
import { FormDynaPageComponent } from './form-dyna-page.component';
import { ExampleSourceModule } from '../../example-source';

///
@NgModule({
    declarations: [FormDynaPageComponent],
    imports: [CommonModule, ExampleSourceModule, ClrFormModule],
    exports: []
})
export class FormDynaPageModule {}
