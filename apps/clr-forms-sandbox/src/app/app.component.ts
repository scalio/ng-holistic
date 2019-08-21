import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'hlc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    private readonly destroy$ = new Subject();

    constructor(router: Router, viewportScroller: ViewportScroller) {
        viewportScroller.setHistoryScrollRestoration('auto');

        router.events
            .pipe(
                takeUntil(this.destroy$),
                filter(element => element instanceof Scroll),
                delay(0)
            )
            .subscribe((element: any) => {
                const scrollElement = document.getElementById(element.anchor);
                if (scrollElement) {
                    scrollElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        router.events
            .pipe(
                takeUntil(this.destroy$),
                filter(element => element instanceof NavigationEnd)
            )
            .subscribe(() => {
                viewportScroller.scrollToPosition([0, 0]);
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}
