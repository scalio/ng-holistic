import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
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
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Memoize } from 'typescript-memoize';
import { HlcClrWizard } from '../models/wizard.types';

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

    @Output() openChanged = new EventEmitter<boolean>();

    @ViewChild('wizard') wizard: ClrWizard;
    @ViewChildren('form') forms: QueryList<ClrFormComponent>;

    constructor(private readonly cdr: ChangeDetectorRef) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.destroy$.next();
    }

    @Memoize()
    getPageGroup(page: HlcClrWizard.WizardStepLayout): ClrFormLayouts.FieldsLayout {
        return { kind: 'fields', fields: page.fields };
    }

    trackByPage(i: number) {
        return i;
    }

    onCommit(page: HlcClrWizard.WizardStepLayout) {
        const vals = this.formsValues;
        this.commiting = true;
        this.error = undefined;
        if (page.commit) {
            page.commit(vals)
                .pipe(
                    take(1),
                    takeUntil(this.destroy$)
                )
                .subscribe(
                    () => {
                        this.commiting = false;
                        this.wizard.forceNext();
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
            this.wizard.forceNext();
        }
    }

    onCancel() {
        this.wizard.cancel();
    }

    onBack() {
        this.wizard.previous();
    }

    isPageSkip(page: HlcClrWizard.WizardStepLayout) {
        if (!page.skip || !this.forms) {
            return false;
        }
        const vals = this.formsValues;
        return page.skip(vals);
    }

    private get formsValues() {
        return this.forms.toArray().map(m => m.form.formGroup.value);
    }
}
