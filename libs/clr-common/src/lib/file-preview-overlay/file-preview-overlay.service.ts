import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector } from '@angular/core';
import { HlcFilePreviewOverlayRef } from './file-preview-overlay-ref';
import { HlcFilePreviewOverlayComponent } from './file-preview-overlay.component';
import { HLC_FILE_PREVIEW_DIALOG_DATA } from './file-preview-overlay.tokens';

export interface Image {
    name: string;
    url: string;
}

interface FilePreviewDialogConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
    hasBackdrop: true,
    // backdropClass: 'dark-backdrop',
    // panelClass: 'tm-file-preview-dialog-panel'
};

@Injectable()
export class HlcFilePreviewOverlayService {
    constructor(private injector: Injector, private overlay: Overlay) {}

    open(img: string, config?: Partial<FilePreviewDialogConfig>) {

        // Override default configuration
        const dialogConfig = { ...DEFAULT_CONFIG, ...(config || {}) };

        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(dialogConfig);

        // Instantiate remote control
        const dialogRef = new HlcFilePreviewOverlayRef(overlayRef);

        this.attachDialogContainer(img, overlayRef, dialogRef);

        overlayRef.backdropClick().subscribe(_ => dialogRef.close());

        return dialogRef;
    }

    private createOverlay(config: FilePreviewDialogConfig) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }

    private attachDialogContainer(
        img: string,
        overlayRef: OverlayRef,
        dialogRef: HlcFilePreviewOverlayRef
    ) {
        const injector = this.createInjector(img, dialogRef);

        const containerPortal = new ComponentPortal(HlcFilePreviewOverlayComponent, null, injector);
        const containerRef: ComponentRef<HlcFilePreviewOverlayComponent> = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    private createInjector(img: string, dialogRef: HlcFilePreviewOverlayRef): PortalInjector {
        const injectionTokens = new WeakMap();

        injectionTokens.set(HlcFilePreviewOverlayRef, dialogRef);
        injectionTokens.set(HLC_FILE_PREVIEW_DIALOG_DATA, img);

        return new PortalInjector(this.injector, injectionTokens);
    }

    private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
        const positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy,
            maxWidth: '90%'
        });

        return overlayConfig;
    }
}
