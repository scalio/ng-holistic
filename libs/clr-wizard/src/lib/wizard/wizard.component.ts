import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
}
