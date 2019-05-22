import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HlcNgSelectComponent } from './ng-select.component';

@NgModule({
    imports: [CommonModule, NgSelectModule, FormsModule],
    declarations: [HlcNgSelectComponent],
    exports: [HlcNgSelectComponent]
})
export class HlcNgSelectModule {}
