import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClrWizard } from '@clr/angular';
import { HlcClrFormComponent, ClrFormLayouts } from '@ng-holistic/clr-forms';
import * as R from 'ramda';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Memoize } from 'typescript-memoize';
import { HlcClrWizard } from '../models/wizard.types';
import { HlcClrWizardCustomPageDirective } from './wizard-custom-page.directive';
import { defaultWizardConfig, HLC_CLR_WIZARD_CONFIG, WizardConfig } from './wizard.config';

@Component({
    selector: 'hlc-clr-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrWizardComponent implements OnInit, OnDestroy {
    readonly config: WizardConfig;
    private readonly destroy$ = new Subject();
    // formsChanged flow
    pervFormsKeys: string[] = [];

    commiting = false;
    error: string | undefined;

    @Input() open = false;
    @Input() title: string;
    @Input() pages: HlcClrWizard.WizardStepLayout[];
    @Input() forceForwardNavigation = false;
    @Input() isInline = false;

    @Output() openChanged = new EventEmitter<boolean>();
    @Output() formsChanged = new EventEmitter<{ [key: string]: FormGroup }>();

    @ViewChild('wizard') wizard: ClrWizard;
    @ViewChildren('form') forms: QueryList<HlcClrFormComponent>;
    @ContentChildren(HlcClrWizardCustomPageDirective) customPages: QueryList<HlcClrWizardCustomPageDirective>;

    constructor(
        private readonly cdr: ChangeDetectorRef,
        @Inject(HLC_CLR_WIZARD_CONFIG) @Optional() config: WizardConfig
    ) {
        this.config = config || defaultWizardConfig;
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.destroy$.next();
    }

    @Memoize()
    getPageGroup(page: HlcClrWizard.WizardStepFormLayout): ClrFormLayouts.FieldsLayout {
        return { kind: 'fields', fields: page.fields };
    }

    trackByPage(i: number) {
        return i;
    }

    get wizardClass() {
        return this.isInline ? 'clr-wizard--inline clr-wizard--no-shadow clr-wizard--no-title' : '';
    }

    onCommit(page: HlcClrWizard.WizardStepLayout) {
        const vals = this.formsValues;
        this.error = undefined;
        if (page.commit) {
            this.commiting = true;
            page.commit(vals)
                .pipe(
                    take(1),
                    takeUntil(this.destroy$)
                )
                .subscribe(
                    () => {
                        this.commiting = false;
                        this.onNext(page);
                        // issue when skipPage is dynamic
                        this.cdr.markForCheck();
                        setTimeout(() => {
                            this.cdr.detectChanges();
                        }, 0);
                    },
                    err => {
                        this.commiting = false;
                        this.error = err;
                        this.cdr.detectChanges();
                    }
                );
        } else {
            this.onNext(page);
        }
    }

    onNext(page: HlcClrWizard.WizardStepLayout) {
        const isLastPage = this.pages.indexOf(page) + 1 === this.pages.length;
        if (isLastPage) {
            this.wizard.forceFinish();
        } else {
            this.wizard.forceNext();
        }
    }

    onCancel() {
        this.wizard.close();
    }

    onBack() {
        this.wizard.previous();
    }

    onCustomButtonClick(buttonType: string) {
        if (buttonType === 'custom-finish') {
            this.forms.forEach(form => form.form.resetValue());
            this.wizard.reset();
        }
    }

    isPageSkip(page: HlcClrWizard.WizardStepLayout) {
        if (!page.skip || !this.forms) {
            return false;
        }
        const vals = this.formsValues;

        // When forms list is changed we need to notify about this container component
        // It could be neccesary if we want to recalculate field properties on the base of another
        // TODO : optimize, check this only if isSkip changed !
        setTimeout(() => {
            const keys = R.keys(this.formsValues) as string[];
            if (!R.equals(this.pervFormsKeys, keys)) {
                this.pervFormsKeys = keys;
                this.formsChanged.emit(this.formsGroups);
            }
        }, 0);

        return page.skip(vals);
    }

    isPageValid(page: HlcClrWizard.WizardStepLayout) {
        if (!this.forms) {
            return true;
        }
        const form = this.forms.find(f => f.id === page.id);
        return form ? form.form.formGroup.valid : true;
    }

    private get formsValues() {
        return this.getFormsPairs(form => form.form.formGroup.value);
    }

    private get formsGroups() {
        return this.getFormsPairs(form => form.form.formGroup);
    }

    private getFormsPairs<T>(mf: (form: HlcClrFormComponent) => T): { [key: string]: T } {
        const formsArr = this.formsArr;
        const valuePairs = formsArr ? formsArr.map(form => [form.id, mf(form)]) : [];
        return R.fromPairs(valuePairs as any);
    }

    private get formsArr() {
        return this.forms && this.forms.toArray();
    }

    //
    isCustomPage(page: HlcClrWizard.WizardStepLayout) {
        return !('fields' in page);
    }

    getCustomPageTemplate(page: HlcClrWizard.WizardStepCustomLayout) {
        const customPage = this.customPages.find(f => f.hlcClrWizardCustomPage === page.id);
        return customPage && customPage.templateRef;
    }

    getCustomPageContext(page: HlcClrWizard.WizardStepCustomLayout) {
        return page && page.context && (page.context instanceof Function ? page.context() : page.context);
    }
}
