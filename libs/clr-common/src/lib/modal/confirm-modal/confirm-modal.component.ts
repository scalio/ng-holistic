import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'hlc-clr-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrConfirmModalComponent implements OnInit {
    @Input() message: string;

    constructor(readonly cdr: ChangeDetectorRef) {}

    ngOnInit() {}
}
