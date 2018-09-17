import { DomPortalHost, TemplatePortal } from '@angular/cdk/portal';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    Directive,
    HostListener,
    Injector,
    Input,
    OnDestroy,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

/**
 * Toggle provided layout display.
 *
 */
@Directive({
    selector: '[hlcPortalTrigger]',
    exportAs: 'portalTrigger'
})
export class PortalTriggerDirective implements OnDestroy {
    private portalHost: DomPortalHost | undefined;

    // tslint:disable-next-line:no-input-rename
    @Input('hlcPortalTrigger') template: TemplateRef<any>;
    @Input() placeholder: any;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly injector: Injector,
        private readonly appRef: ApplicationRef,
        private readonly viewContainerRef: ViewContainerRef
    ) {}

    show() {
        if (this.portalHost) {
            return;
        }

        this.portalHost = new DomPortalHost(
            this.placeholder as any,
            this.componentFactoryResolver,
            this.appRef,
            this.injector
        );

        const portal = new TemplatePortal(this.template, this.viewContainerRef);

        portal.attach(this.portalHost);
    }

    hide() {
        if (this.portalHost) {
            this.portalHost.detach();
            this.portalHost = undefined;
        }
    }

    ngOnDestroy() {
        this.hide();
    }

    @HostListener('click', ['onClick($event)'])
    onClick($event: any) {
        // Toggle layout display on host click

        if (!$event) {
            return;
        }

        $event.preventDefault();
        $event.stopPropagation();

        if (!this.portalHost) {
            this.show();
        } else {
            this.hide();
        }
    }

    // click outside
    @HostListener('document:click', ['onDocumentClick($event)'])
    onDocumentClick($event: MouseEvent) {
        if (!$event) {
            return;
        }
        if (!this.placeholder.contains($event.target)) {
            this.hide();
        }
    }
}
