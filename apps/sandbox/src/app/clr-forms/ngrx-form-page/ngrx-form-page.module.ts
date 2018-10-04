import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormsModule, FormFooterModule } from '@ng-holistic/clr-forms';
// import { NgrxFormPageComponent } from './ngrx-form-page.component';
import { StoreModule } from './store';

@NgModule({
    declarations: [],
    imports: [CommonModule, ClrFormsModule, FormFooterModule, StoreModule],
    exports: []
})
export class NgrxFormPageModule {}
