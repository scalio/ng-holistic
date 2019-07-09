import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcSbxExampleLinkButtonComponent } from './example-link-button.component';
import { ClrButtonModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, ClrButtonModule],
    declarations: [HlcSbxExampleLinkButtonComponent],
    exports: [HlcSbxExampleLinkButtonComponent]
})
export class HlcSbxExampleLinkButtonModule {}
