import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'hlc-clr-form-error',
    templateUrl: './form-error.component.html',
    styleUrls: ['./form-error.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrFormErrorComponent {

    @Input() message: string | undefined;

    @Output() reset = new EventEmitter();

    onResetError() {
        this.reset.next();
    }
}
