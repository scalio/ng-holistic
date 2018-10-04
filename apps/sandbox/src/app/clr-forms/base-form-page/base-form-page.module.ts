import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormsModule } from '@ng-holistic/clr-forms';
import { BaseFormPageComponent } from './base-form-page.component';
import { FieldsLayoutModule } from '@ng-holistic/forms';

///
@NgModule({
    declarations: [BaseFormPageComponent],
    imports: [CommonModule, ClrFormsModule, FieldsLayoutModule],
    exports: [BaseFormPageComponent]
})
export class BaseFormPageModule {}
