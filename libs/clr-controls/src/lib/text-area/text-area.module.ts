import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [TextAreaComponent],
    exports: [TextAreaComponent],
    entryComponents: [TextAreaComponent]
})
export class HlcClrTextAreaModule {}
