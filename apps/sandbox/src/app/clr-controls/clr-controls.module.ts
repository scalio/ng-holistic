import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrControlsComponent } from './clr-controls.component';
import { SelectModule } from '@ng-holistic/clr-controls';

@NgModule({
    declarations: [ClrControlsComponent],
    imports: [CommonModule, SelectModule],
    providers: [],
    bootstrap: []
})
export class ClrControlsModule {}
