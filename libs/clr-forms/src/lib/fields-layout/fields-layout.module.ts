import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrDatepickerModule } from '@clr/angular';
import {
    DateTimeModule,
    FileUploadModule,
    ImageUploadModule,
    MaskModule,
    SelectModule
} from '@ng-holistic/clr-controls';
import { InputContainerModule } from '../input-container';
import { FieldsLayoutComponent } from './fields-layout.component';
@NgModule({
    imports: [
        CommonModule,
        InputContainerModule,
        SelectModule,
        ImageUploadModule,
        FileUploadModule,
        DateTimeModule,
        ReactiveFormsModule,
        ClrDatepickerModule,
        MaskModule
    ],
    declarations: [FieldsLayoutComponent],
    exports: [FieldsLayoutComponent]
})
export class FieldsLayoutModule {}
