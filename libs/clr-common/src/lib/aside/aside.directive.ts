import {
    ContentChild,
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewContainerRef,
    ChangeDetectorRef,
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
export class HlcAsideDirective implements OnInit, OnDestroy {
    private bkpClickedSub: Subscription | null;

    constructor(
        private readonly asideService: HlcAsideService,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly cdr: ChangeDetectorRef,
    ) {}

    @Input()
    position?: string;

    /**
     * Emit events when user clicks background
     */
    @Output()
    backdropClicked = new EventEmitter();

    //@ts-ignore
    @ContentChild(TemplateRef, { static: false })
    content: TemplateRef<any>;

    ngOnInit() {
        const params = {
            position: this.position ? this.position : 'right',
        };

        const bkpClicks$ = this.asideService.showTemplate(this.content, this.viewContainerRef, params);

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
