import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertType } from '../../common.types';

@Component({
    selector: 'hlc-clr-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrAlertModalComponent implements OnInit {
    @Input() message: string;
    @Input() alertType: AlertType;

    constructor(public readonly cdr: ChangeDetectorRef) {}

    ngOnInit() {}
}
