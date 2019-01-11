import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'hlc-wizard-base-page',
    templateUrl: './wizard-base-page.component.html',
    styleUrls: ['./wizard-base-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardBasePageComponent {
    constructor() {}
}
