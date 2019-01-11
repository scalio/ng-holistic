import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';

const group: ClrFormLayouts.WizardLayout = {
    kind: 'wizard',
    title: 'Wizard Title',
    open: true,
    $content: [
        {
            kind: 'wizard-step',
            title: 'Step A',
            navTitle: 'Step 1',
            $content: []
        },
        {
            kind: 'wizard-step',
            title: 'Step B',
            navTitle: 'Step 2',
            $content: []
        }
    ]
};

@Component({
    selector: 'hlc-wizard-base-page',
    templateUrl: './wizard-base-page.component.html',
    styleUrls: ['./wizard-base-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardBasePageComponent {
    group = group;
    constructor() {}
}
