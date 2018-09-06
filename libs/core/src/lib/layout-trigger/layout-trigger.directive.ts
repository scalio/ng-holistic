import { Directive, ElementRef, Input, ViewContainerRef, TemplateRef, HostListener, OnDestroy } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';

/**
 * Toggle provided layout display.
 *
 */
@Directive({
    selector: '[hlcLayoutTrigger]',
    exportAs: 'layoutTrigger',
})
export class LayoutTriggerDirective implements OnDestroy {
    private backDropClickSub: Subscription;
    private overlayRef: OverlayRef;
    isOpen = false;

    /**
     * Template with provided layout
     */
    // tslint:disable-next-line:no-input-rename
    @Input('hlcLayoutTrigger')
    container: TemplateRef<any>;
    @Input()
    context: any | undefined;

    constructor(public overlay: Overlay, private elementRef: ElementRef, private viewContainerRef: ViewContainerRef) {}

    ngOnDestroy() {
        if (this.backDropClickSub) {
            this.backDropClickSub.unsubscribe();
        }
    }

    private init() {
        const positionStrategy = this.overlay
            .position()
            .connectedTo(
                this.elementRef,
                { originX: 'start', originY: 'bottom' },
                { overlayX: 'end', overlayY: 'top' },
            );

        const overlayConfig = new OverlayConfig({
            positionStrategy,
            hasBackdrop: true,
        });

        this.overlayRef = this.overlay.create(overlayConfig);

        this.backDropClickSub = this.overlayRef.backdropClick().subscribe(() => this.hide());
    }

    private show() {
        const portal = new TemplatePortal(this.container, this.viewContainerRef, {
            $implicit: this.context,
            controller: this,
        });
        this.overlayRef.attach(portal);
        this.isOpen = true;
    }

    hide() {
        this.overlayRef.detach();
        this.isOpen = false;
    }

    @HostListener('click', ['onClick($event)'])
    onClick($event: any) {
        // Toggle layout display on host click

        if (!$event) {
            // TODO: not clear why click event doubled
            // Doubled event always has undefined arg
            return;
        }

        $event.preventDefault();
        $event.stopPropagation();

        if (!this.overlayRef) {
            this.init();
        }

        const isOpen = this.isOpen;

        this.hide();

        if (!isOpen) {
            this.show();
        }
    }
}
