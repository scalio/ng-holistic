import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren,
    ViewContainerRef,
    Optional,
    ViewChild
} from '@angular/core';
import {
    ExtractFieldsFun,
    FormGroupProvider,
    HLC_FORM_EXTRACT_FIELDS,
    HLC_FORM_GROUP_PROVIDER,
    IFormGroup
} from '@ng-holistic/forms';
import { merge, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as R from 'ramda';
import { HLC_CLR_TABS_LAYOUT_CONFIG, TabsLayoutConfig, defaultTabsLayoutConfig } from './tabs-layout.config';

@Component({
    selector: 'hlc-tab-layout',
    template: '<ng-container #vc></ng-container>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabLayoutComponent {
    @ViewChild('vc', { read: ViewContainerRef })
    vc: ViewContainerRef;

    constructor() {}
}

@Component({
    selector: 'hlc-clr-tabs-layout',
    templateUrl: './tabs-layout.component.html',
    styleUrls: ['./tabs-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrTabsLayoutComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject();
    readonly config: TabsLayoutConfig;

    activeTab = 0;
    @ViewChildren('vc', { read: ViewContainerRef })
    vc: QueryList<ViewContainerRef>;

    @Input()
    $content: IFormGroup<any, any>[];

    constructor(
        @Inject(HLC_FORM_GROUP_PROVIDER) private readonly formGroupProvider: FormGroupProvider,
        @Inject(HLC_FORM_EXTRACT_FIELDS) private readonly extractFieldsFun: ExtractFieldsFun,
        @Optional() @Inject(HLC_CLR_TABS_LAYOUT_CONFIG) config?: TabsLayoutConfig
    ) {
        this.config = config || defaultTabsLayoutConfig;
    }

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

    tabHasErrors(tab: IFormGroup<any, any>) {
        const tabFields = this.extractFieldsFun(tab);
        const form = this.formGroupProvider.form;
        return R.pipe(
            R.pluck('id'),
            R.map(id => form.controls[id as string]),
            R.any(ctr => !!ctr.errors)
        )(tabFields);
    }
}
