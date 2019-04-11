import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import {
    ExtractFieldsFun,
    focusFirstInput,
    FormGroupProvider,
    HLC_FORM_EXTRACT_FIELDS,
    HLC_FORM_GROUP_PROVIDER,
    IFormGroup
} from '@ng-holistic/forms';
import * as R from 'ramda';
import { merge, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { HlcFormKeysManagerService } from '../form/utils/form-keys-manager.service';
import { HLC_CLR_TABS_LAYOUT_CONFIG, TabsLayoutConfig } from './tabs-layout.config';

@Component({
    selector: 'hlc-tab-layout',
    template: '<div class="clr-row"><div class="clr-col-sm-10"><ng-container #vc></ng-container></div></div>',
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

    activeTab = 0;
    @ViewChildren('vc', { read: ViewContainerRef })
    vc: QueryList<ViewContainerRef>;

    @Input()
    $content: IFormGroup<any, any>[];

    constructor(
        @Inject(HLC_FORM_GROUP_PROVIDER) private readonly formGroupProvider: FormGroupProvider,
        @Inject(HLC_FORM_EXTRACT_FIELDS) private readonly extractFieldsFun: ExtractFieldsFun,
        private readonly elementRef: ElementRef,
        private readonly cdr: ChangeDetectorRef,
        @Optional() @Inject(HLC_CLR_TABS_LAYOUT_CONFIG) public config?: TabsLayoutConfig,
        @Optional() formKeysManager?: HlcFormKeysManagerService
    ) {
        if (formKeysManager) {
            formKeysManager.nextTab$.pipe(takeUntil(this.destroy$)).subscribe(() => this.onNextTab());
            formKeysManager.pervTab$.pipe(takeUntil(this.destroy$)).subscribe(() => this.onPervTab());
        }
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

    // TODO: Move to key manager + focus by tab number
    private onNextTab() {
        if (this.activeTab + 1 < this.$content.length) {
            this.activeTab++;
        } else {
            this.activeTab = 0;
        }
        this.cdr.markForCheck();
        this.focusFirstInput();
    }

    private onPervTab() {
        if (this.activeTab === 0) {
            this.activeTab = this.$content.length - 1;
        } else {
            this.activeTab--;
        }
        this.cdr.markForCheck();
        this.focusFirstInput();
    }

    private focusFirstInput() {
        setTimeout(() => {
            focusFirstInput(
                this.elementRef,
                `[aria-index="${this.activeTab}"] .hlc-form-input input, [aria-index="${
                    this.activeTab
                }"] .hlc-form-input select`
            );
        }, 0);
    }
}
