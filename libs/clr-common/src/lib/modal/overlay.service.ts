import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef, InjectionToken, Injector } from '@angular/core';

export type LayoutPosition = 'left' | 'right' | 'center';

/**
 * Paramaters to customize overlay
 */
export interface LayoutParams {
    // horizontal position
    position: LayoutPosition;
}

interface TemplateParams {
    kind: 'TemplateParams';
    templateRef: TemplateRef<any>;
    viewContainerRef: ViewContainerRef;
    data?: any;
}

interface ComponentParams {
    kind: 'ComponentParams';
    componentType: any;
    data?: any;
}

type ContentParams = TemplateParams | ComponentParams;

export const HLC_CONTAINER_DATA = new InjectionToken<any>('HLC_CONTAINER_DATA');

/**
 * Provides API to show / hide layout.
 */
@Injectable()
export class HlcClrOverlayService {
    private overlayRef: OverlayRef;
    private positionStrategy: GlobalPositionStrategy;

    constructor(private readonly overlay: Overlay, private readonly injector: Injector) {
        this.positionStrategy = this.overlay.position().global();

        // TODO: backdropClass overlay above modal when modal content created with delay
        // example: when using with hlc-forms
        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            positionStrategy: this.positionStrategy
            // backdropClass: 'modal-backdrop'
        });

        this.overlayRef = this.overlay.create(overlayConfig);
    }

    /**
     * Given component type, displays it.
     * Component must be included in module `entryComponents`
     */
    showComponent<T>(componentType: any, params: LayoutParams, data?: any) {
        return this.show<T>({ kind: 'ComponentParams', componentType, data }, params);
    }

    /**
     * Given template display it's content.
     */
    showTemplate<T>(
        templateRef: TemplateRef<any>,
        viewContainerRef: ViewContainerRef,
        params: LayoutParams,
        data?: any
    ) {
        return this.show<T>({ kind: 'TemplateParams', templateRef, viewContainerRef, data }, params);
    }

    /**
     * Hide side panel
     */
    hide() {
        if (this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }
    }

    private updatePositionStrategy(position: LayoutPosition) {
        switch (position) {
            case 'left':
                this.positionStrategy.left();
                break;
            case 'right':
                this.positionStrategy.right();
                break;
            case 'center':
                this.positionStrategy.centerHorizontally();
                this.positionStrategy.centerVertically();
                break;
        }
    }

    private createInjector(data: any): PortalInjector {
        const injectorTokens = new WeakMap();
        injectorTokens.set(HLC_CONTAINER_DATA, data);
        return new PortalInjector(this.injector, injectorTokens);
    }

    private createPortal(content: ContentParams) {
        const injector = content.data ? this.createInjector(content.data) : undefined;
        return content.kind === 'TemplateParams'
            ? new TemplatePortal(content.templateRef, content.viewContainerRef)
            : new ComponentPortal(content.componentType, undefined, injector);
    }

    private show<T>(content: ContentParams, params: LayoutParams) {
        this.updatePositionStrategy(params.position);

        const portal = this.createPortal(content);

        const { instance } = this.overlayRef.attach(portal);

        return { instance: instance as T, backdropClick: this.overlayRef.backdropClick() };
    }
}
