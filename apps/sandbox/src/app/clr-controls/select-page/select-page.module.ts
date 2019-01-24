import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrSelectModule } from '@ng-holistic/clr-controls';
import { SelectPageComponent } from './select-page.component';

@NgModule({
    declarations: [SelectPageComponent],
    imports: [CommonModule, HlcClrSelectModule],
    exports: [SelectPageComponent]
})
export class SelectPageModule {}
