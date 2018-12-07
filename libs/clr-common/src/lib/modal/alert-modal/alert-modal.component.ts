import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

export type AlertType = 'success' | 'info' | 'danger' | 'warning';

@Component({
    selector: 'hlc-clr-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertModalComponent implements OnInit {
    @Input() message: string;
    @Input() alertType: AlertType;

    constructor() {}

    ngOnInit() {}
}
