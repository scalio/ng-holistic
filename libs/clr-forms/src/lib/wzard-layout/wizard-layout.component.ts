import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IFormGroup } from '@ng-holistic/forms';

@Component({
    selector: 'hlc-wizard-layout',
    templateUrl: './wizard-layout.component.html',
    styleUrls: ['./wizard-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardLayoutComponent {
    @Input() open: boolean;
    @Input() title: string;
    @Output() openChanged = new EventEmitter<boolean>();

    @Input()
    $content: IFormGroup<any, any>[];

    constructor() {}
}
