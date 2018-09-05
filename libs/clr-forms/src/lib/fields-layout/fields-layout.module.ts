import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsLayoutComponent } from './fields-layout.component';
import { InputContainerModule } from '../input-container';
import { SelectModule, ImageUploadModule, FileUploadModule, DateTimeModule } from '@ng-holistic/clr-controls';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrDatepickerModule } from '@clr/angular';
@NgModule({
    imports: [
        CommonModule,
        InputContainerModule,
        SelectModule,
        ImageUploadModule,
        FileUploadModule,
        DateTimeModule,
        ReactiveFormsModule,
        ClrDatepickerModule
    ],
    declarations: [FieldsLayoutComponent],
    exports: [FieldsLayoutComponent]
})
export class FieldsLayoutModule {}
