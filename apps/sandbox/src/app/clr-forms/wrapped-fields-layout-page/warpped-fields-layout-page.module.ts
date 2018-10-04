import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormsModule } from '@ng-holistic/clr-forms';
import { WrappedFiedlsLayoutComponent } from './wrapped-fields-layout-page.component';
import { FieldsLayoutModule } from '@ng-holistic/forms';

///
@NgModule({
    declarations: [WrappedFiedlsLayoutComponent],
    imports: [CommonModule, ClrFormsModule, FieldsLayoutModule],
    exports: [WrappedFiedlsLayoutComponent]
})
export class WrappedFiedlsLayoutModule {}
