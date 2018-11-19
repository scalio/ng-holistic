import {
    ChangeDetectionStrategy,
    Component,
    Input,
    QueryList,
    ViewChildren,
    ViewContainerRef,
    OnInit,
    OnDestroy
} from '@angular/core';
import { IFormGroup } from '@ng-holistic/forms';
import { merge, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'hlc-tabs-layout',
    templateUrl: './tabs-layout.component.html',
    styleUrls: ['./tabs-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsLayoutComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject();

    activeTab = 0;
    @ViewChildren('vc', { read: ViewContainerRef })
    vc: QueryList<ViewContainerRef>;

    @Input()
    $content: IFormGroup<any, any>[];

    ngOnInit() {
        // Set first tab as active, then current active is hiding
        const hide$ = this.$content
            .map((tab, i) => tab.$hidden && tab.$hidden.pipe(map(f => [i, f])))
            .filter(f => !!f) as Observable<[number, boolean]>[];

        merge(...hide$)
            .pipe(takeUntil(this.destroy$))
            .subscribe(([i, f]) => {
                if (i === this.activeTab && f) {
                    this.activeTab = 0;
                }
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    onSetTabActive(index: number) {
        this.activeTab = index;
    }

    isTabActive(index: number) {
        return this.activeTab === index;
    }

    isTabVisible(f: boolean) {
        return !f;
    }
}
