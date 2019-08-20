import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, Scroll, NavigationEnd } from '@angular/router';
import { takeUntil, filter, delay } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';

@Component({
    selector: 'hlc-clr-sandbox-root',
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
