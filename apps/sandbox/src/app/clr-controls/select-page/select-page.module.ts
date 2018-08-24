import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectModule } from '@ng-holistic/clr-controls';
import { SelectPageComponent } from './select-page.component';

@NgModule({
    declarations: [SelectPageComponent],
    imports: [CommonModule, SelectModule],
    exports: [SelectPageComponent]
})
export class SelectPageModule {}
