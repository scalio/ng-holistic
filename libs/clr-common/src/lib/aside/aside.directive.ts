import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectorRef,
    ContentChild,
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { HlcAsideService } from './aside.service';

/**
 * Helper directive to display conveniently side overlay.
 * Applyed to `ng-template`
 * On init will display side overlay panel with Hello content.
 * @example
 * ```
 * <!-- will display Hello on rigth side overlay -->
 * <ng-template hlcClrAside>
 *   <h5> Hello </h5>
 * </ng-template>
 * ```
 */
@Directive({
    selector: '[hlcAside]',
})
export class HlcAsideDirective implements AfterViewInit, OnDestroy, AfterContentInit {
    private bkpClickedSub: Subscription | null;

    constructor(
        public templateRef: TemplateRef<any>,
        private readonly asideService: HlcAsideService,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly cdr: ChangeDetectorRef
    ) {}

    @Input()
    position?: string;

    /**
     * Emit events when user clicks background
     */
    @Output()
    backdropClicked = new EventEmitter();

    @ContentChild(TemplateRef, { static: true })
    content: TemplateRef<any>;

    ngAfterContentInit() {}

    ngAfterViewInit() {
        const params = {
            position: this.position ? this.position : 'right',
        };

        const bkpClicks$ = this.asideService.showTemplate(this.templateRef, this.viewContainerRef, params);

        if (bkpClicks$) {
            this.bkpClickedSub = bkpClicks$.subscribe(() => {
                this.backdropClicked.emit();
            });
        }

        this.cdr.detectChanges();
    }

    ngOnDestroy() {
        if (this.bkpClickedSub) {
            this.bkpClickedSub.unsubscribe();
        }
        this.asideService.hide();
    }
}
