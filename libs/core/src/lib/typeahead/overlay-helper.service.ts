import { Injectable, ElementRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Subscription, Observable } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { ResultsContentComponent, ContainerProperties } from './results-container/results-container.component';
import { merge, mapTo } from 'rxjs/operators';

@Injectable()
export class OverlayHelperService {
    private backDropClickSub: Subscription;
    private keydownSub: Subscription;
    private resultsSub: Subscription;
    private overlayRef: OverlayRef;
    isOpen = false;

    constructor(public overlay: Overlay, private elementRef: ElementRef, private viewContainerRef: ViewContainerRef) {}

    private init() {
        const positions = [
            {
                originX: 'start' as 'start',
                originY: 'bottom' as 'bottom',
                overlayX: 'start' as 'start',
                overlayY: 'top' as 'top'
            }
        ];

        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef)
            .withPositions(positions)
            .withLockedPosition(true);

        const overlayConfig = new OverlayConfig({
            positionStrategy,
            hasBackdrop: true,
            backdropClass: 'typeahead-backdrop',
            scrollStrategy: this.overlay.scrollStrategies.block()
        });

        this.overlayRef = this.overlay.create(overlayConfig);
    }

    show(
        containerProperties: ContainerProperties,
        results$: Observable<any[]>,
        keyDown$: Observable<KeyboardEvent>
    ): Observable<any | null> {
        if (!this.overlayRef) {
            this.init();
        }

        const portal = new ComponentPortal(ResultsContentComponent, this.viewContainerRef);
        const component = this.overlayRef.attach(portal);
        this.isOpen = true;

        component.instance.resultTemplate = containerProperties.resultTemplate;
        component.instance.value = containerProperties.value;
        component.instance.resultFormatter = containerProperties.resultFormatter;
        component.instance.skipPredicate = containerProperties.skipPredicate;

        this.resultsSub = results$.subscribe(x => (component.instance.results = x));

        this.keydownSub = keyDown$.subscribe(x => component.instance.onKeyDown(x));

        return component.instance.selected.pipe(merge(this.overlayRef.backdropClick().pipe(mapTo(null))));
    }

    hide() {
        this.unsubContainerEvents();

        this.overlayRef.detach();
        this.resultsSub.unsubscribe();
        this.isOpen = false;
    }

    destroy() {
        this.unsubContainerEvents();
        if (this.backDropClickSub) {
            this.backDropClickSub.unsubscribe();
        }
    }

    unsubContainerEvents() {
        if (this.resultsSub) {
            this.resultsSub.unsubscribe();
        }
        if (this.keydownSub) {
            this.keydownSub.unsubscribe();
        }
    }
}
