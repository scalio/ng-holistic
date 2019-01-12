import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlcClrWizard } from '@ng-holistic/clr-wizard';

const pages: HlcClrWizard.WizardStepLayout[] = [
    {
        title: 'Step A',
        navTitle: 'Step 1',
        fields: []
    },
    {
        title: 'Step B',
        navTitle: 'Step 2',
        fields: []
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
