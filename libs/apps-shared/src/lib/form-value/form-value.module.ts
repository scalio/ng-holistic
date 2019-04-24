import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcPrettyJsonModule } from '../pretty-json.pipe';
import { HlcSbxFormValueComponent } from './form-value.component';

@NgModule({
    imports: [CommonModule, HlcPrettyJsonModule],
    declarations: [HlcSbxFormValueComponent],
    exports: [HlcSbxFormValueComponent]
})
export class HlcFormValueModule {}
