import { NgModule } from '@angular/core';
import { ClrFormModule } from '@ng-holistic/clr-forms';
import { ExampleSourceModule } from '../../example-source';
import { FormRecalcPageComponent } from './form-recalc-page.component';
import { CommonModule } from '@angular/common';

///
@NgModule({
    declarations: [FormRecalcPageComponent],
    imports: [CommonModule, ExampleSourceModule, ClrFormModule],
    exports: [FormRecalcPageComponent]
})
export class FormReclcPageModule {}
