import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlcClrWizard } from '@ng-holistic/clr-wizard';

const pages: HlcClrWizard.WizardStepLayout[] = [
    {
        title: 'Step A',
        navTitle: 'Step 1',
        fields: [
            {
                id: 'firstName',
                kind: 'TextField',
                label: 'First Name'
            },
            {
                id: 'select',
                kind: 'SelectField',
                label: 'Select',
                items: [{ key: '1111', label: '222' }]
            }
        ]
    },
    {
        title: 'Step B',
        navTitle: 'Step 2',
        fields: [
            {
                id: 'lastName',
                kind: 'TextField',
                label: 'Last Name'
            }
        ]
    }
];

@Component({
    selector: 'hlc-wizard-base-page',
    templateUrl: './wizard-base-page.component.html',
    styleUrls: ['./wizard-base-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardBasePageComponent {
    pages = pages;
    constructor() {}
}
