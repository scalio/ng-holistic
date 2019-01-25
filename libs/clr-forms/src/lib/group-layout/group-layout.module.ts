import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrGroupLayoutComponent } from './group-layout.component';

@NgModule({
    imports: [CommonModule],
    declarations: [HlcClrGroupLayoutComponent],
    exports: [HlcClrGroupLayoutComponent],
    entryComponents: [HlcClrGroupLayoutComponent]
})
export class GroupLayoutModule {}
