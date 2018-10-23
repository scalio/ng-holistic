import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseFormPageComponent } from './base-form-page.component';
import { FieldsLayoutModule } from '@ng-holistic/forms';

///
@NgModule({
    declarations: [BaseFormPageComponent],
    imports: [CommonModule, FieldsLayoutModule],
    exports: [BaseFormPageComponent]
})
export class BaseFormPageModule {}
