import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcFilePreviewOverlayComponent } from './file-preview-overlay.component';
import { HlcFilePreviewOverlayService } from './file-preview-overlay.service';

@NgModule({
    declarations: [HlcFilePreviewOverlayComponent],
    exports: [HlcFilePreviewOverlayComponent],
    imports: [CommonModule],
    providers: [HlcFilePreviewOverlayService],
    entryComponents: [HlcFilePreviewOverlayComponent]
})
export class HlcFilePreviewOverlayModule {}
