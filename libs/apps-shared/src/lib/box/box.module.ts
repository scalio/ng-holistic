import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FmBoxComponent } from './box.component';

@NgModule({
    declarations: [FmBoxComponent],
    imports: [CommonModule],
    exports: [FmBoxComponent],
    providers: []
})
export class FmBoxModule {}
