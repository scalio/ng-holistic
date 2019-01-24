import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToggleComponent } from './toggle.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ToggleComponent],
    exports: [ToggleComponent]
})
export class HlcClrToggleModule {}
