import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcBoxComponent } from './box.component';

@NgModule({
    declarations: [HlcBoxComponent],
    imports: [CommonModule],
    exports: [HlcBoxComponent]
})
export class HlcBoxModule {}
