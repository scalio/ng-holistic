import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectPageComponent } from './ng-select-page.component';
import { HlcNgSelectModule } from '@ng-holistic/ng-select';

@NgModule({
    declarations: [NgSelectPageComponent],
    imports: [CommonModule, HlcNgSelectModule],
    exports: [NgSelectPageComponent]
})
export class NgSelectPageModule {}
