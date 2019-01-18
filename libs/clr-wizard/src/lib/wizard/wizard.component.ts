import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { ClrWizard } from '@clr/angular';
import { ClrFormComponent, ClrFormLayouts } from '@ng-holistic/clr-forms';
import * as R from 'ramda';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Memoize } from 'typescript-memoize';
import { HlcClrWizard } from '../models/wizard.types';
import { WizardCustomPageDirective } from './wizard-custom-page.directive';

@Component({
    selector: 'hlc-clr-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject();

    commiting = false;
    error: string | undefined;

    @Input() open = false;
    @Input() title: string;
    @Input() pages: HlcClrWizard.WizardStepLayout[];
    @Input() forceForwardNavigation = false;
    @Input() isInline = false;

    @Output() openChanged = new EventEmitter<boolean>();

    @ViewChild('wizard') wizard: ClrWizard;
    @ViewChildren('form') forms: QueryList<ClrFormComponent>;
    @ContentChildren(WizardCustomPageDirective) customPages: QueryList<WizardCustomPageDirective>;

    constructor(private readonly cdr: ChangeDetectorRef) {}

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
        if (buttonType === 'reset-finish') {
            this.forms.forEach(form => form.form.resetValue());
            this.wizard.reset();
        }
    }

    isPageSkip(page: HlcClrWizard.WizardStepLayout) {
        if (!page.skip || !this.forms) {
            return false;
        }
        const vals = this.formsValues;
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
        const formsArr = this.formsArr;
        const valuePairs = formsArr ? formsArr.map(form => [form.id, form.form.formGroup.value]) : [];
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
}
