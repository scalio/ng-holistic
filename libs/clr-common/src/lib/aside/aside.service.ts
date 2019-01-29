import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Paramaters to customize overlay
 */
export interface AsideParams {
    /**
     * Position of the overlay panel: left or right
     */
    position: string;
}

interface TemplateParams {
    kind: 'TemplateParams';
    templateRef: TemplateRef<any>;
    viewContainerRef: ViewContainerRef;
}

interface ComponentParams {
    kind: 'ComponentParams';
    componentType: any;
}

type ContentParams = TemplateParams | ComponentParams;

/**
 * Provides API to show / hide floating side overlay with some content.
 * Panel will have 100% height and 500 px width, will be shown at right.
 */
@Injectable()
export class HlcAsideService {
    private overlayRef: OverlayRef;
    private positionStrategy: any;

    constructor(private readonly overlay: Overlay) {
        this.positionStrategy = this.overlay.position().global();

        const overlayConfig = new OverlayConfig({
            backdropClass: 'aside-backdrop',
            hasBackdrop: true,
            panelClass: 'aside-content',
            positionStrategy: this.positionStrategy
        });

        this.overlayRef = this.overlay.create(overlayConfig);
    }

    private show(content: ContentParams, params: AsideParams) {
        if (!this.overlayRef.hasAttached()) {
            if (params.position === 'left') {
                this.positionStrategy.left();
            } else if (params.position === 'right') {
                this.positionStrategy.right();
            }

            const portal =
                content.kind === 'TemplateParams'
                    ? new TemplatePortal(content.templateRef, content.viewContainerRef)
                    : new ComponentPortal(content.componentType);

            this.overlayRef.attach(portal);

            return this.overlayRef.backdropClick();
        } else {
            return null;
        }
    }

    /**
     * Given component type, displays it in right side overlay.
     * Component must be included in module `entryComponents`
     */
    showComponent(componentType: any, params: AsideParams) {
        return this.show({ kind: 'ComponentParams', componentType }, params);
    }

    /**
     * Given template display it's content in right side overlay.
     */
    showTemplate(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef, params: AsideParams) {
        return this.show({ kind: 'TemplateParams', templateRef, viewContainerRef }, params);
    }

    /**
     * Hide side panel
     */
    hide() {
        if (this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }
    }
}
