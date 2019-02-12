// Copied from here https://blog.thoughtram.io/angular/2017/11/20/custom-overlays-with-angulars-cdk.html

import { OverlayRef } from '@angular/cdk/overlay';

export class HlcFilePreviewOverlayRef {
    constructor(private overlayRef: OverlayRef) {}

    close(): void {
        this.overlayRef.dispose();
    }
}
