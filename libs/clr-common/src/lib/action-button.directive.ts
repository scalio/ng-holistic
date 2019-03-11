import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Directive, HostListener, Input, NgModule } from '@angular/core';
import { ClrLoading, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState } from '@clr/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Directive({
    selector: '[hlcClrActionButton]'
})
export class HlcClrActionButtonDirective {
    constructor(private readonly loading: ClrLoading, private readonly cdr: ChangeDetectorRef) {}

    @Input('hlcClrActionButton') action: Observable<any>;

    @HostListener('click') onClick() {
        this.loading.loadingState = ClrLoadingState.LOADING;
        if (this.action) {
            this.action.pipe(take(1)).subscribe(
                () => {
                    this.loading.loadingState = ClrLoadingState.SUCCESS;
                    this.cdr.markForCheck();
                },
                () => {
                    this.loading.loadingState = ClrLoadingState.ERROR;
                    this.cdr.markForCheck();
                }
            );
        }
    }
}

/**
 * clrLoading must be present on element in conjuction with HlcClrActionButtonDirective,
 * ClrLoadingModule must be imported
 */
@NgModule({
    declarations: [HlcClrActionButtonDirective],
    imports: [CommonModule, ClrLoadingButtonModule, ClrLoadingModule],
    exports: [HlcClrActionButtonDirective, ClrLoadingButtonModule, ClrLoadingModule]
})
export class HlcClrActionButtonModule {}
