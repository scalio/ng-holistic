import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';
import { Memoize } from 'typescript-memoize';
import { HlcClrWizard } from '../models/wizard.types';

@Component({
    selector: 'hlc-clr-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardComponent implements OnInit {
    @Input() open = false;
    @Input() title: string;
    @Input() pages: HlcClrWizard.WizardStepLayout[];

    @Output() openChanged = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit() {}

    @Memoize()
    getPageGroup(page: HlcClrWizard.WizardStepLayout): ClrFormLayouts.FieldsLayout {
        return { kind: 'fields', fields: page.fields };
    }

    trackByPage(i: number) {
        return i;
    }
}
