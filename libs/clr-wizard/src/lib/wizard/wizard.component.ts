import {
    ChangeDetectionStrategy,
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

    error: string | undefined;

    @Input() open = false;
    @Input() title: string;
    @Input() pages: HlcClrWizard.WizardStepLayout[];

    @Output() openChanged = new EventEmitter<boolean>();

    @ViewChild('wizard') wizard: ClrWizard;
    @ViewChildren('form') forms: QueryList<ClrFormComponent>;

    constructor() {}

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
        const index = this.pages.indexOf(page);
        const form: ClrFormComponent = this.forms.toArray()[index];
        this.error = undefined;
        if (page.commit) {
            page.commit(form.form.formGroup.value)
                .pipe(
                    take(1),
                    takeUntil(this.destroy$)
                )
                .subscribe(
                    () => {
                        this.wizard.forceNext();
                    },
                    err => {
                        this.error = err;
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
}
