import { DomPortalHost, TemplatePortal } from '@angular/cdk/portal';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    Directive,
    ElementRef,
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
    @Input() placeholder: ElementRef<any>;

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

        console.log('+++', this.placeholder);

        this.portalHost = new DomPortalHost(
            this.placeholder as any,
            this.componentFactoryResolver,
            this.appRef,
            this.injector
        );

        const portal = new TemplatePortal(this.template, this.viewContainerRef);

        portal.attach(this.portalHost);
        // component.instance.close.pipe(take(1)).subscribe(() => this.hide());
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
            // TODO: not clear why click event doubled
            // Doubled event always has undefined arg
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
}
