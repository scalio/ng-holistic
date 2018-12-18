import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertType } from '../common.types';

@Component({
    selector: 'hlc-clr-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {

    @Input() alertType: AlertType = 'info';
    @Input() canClose = true;

    @Output() close = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    get alertClass() {
        return `alert-${this.alertType}`;
    }

    get alertIcon() {
        switch (this.alertType) {
            case 'danger':
                return 'exclamation-circle';
            case 'warning':
                return 'exclamation-triangle';
            case 'info':
                return 'info-circle';
            case 'success':
                return 'check-circle';
        }
    }

    onClose() {
        this.close.emit();
    }
}
