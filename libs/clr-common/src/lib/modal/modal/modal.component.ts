import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'hlc-clr-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {
    @Input() modalSize: 'modal-sm' | 'modal-lg' | 'modal-md' | 'modal-xl' | undefined;
    @Input() title: string;
    @Input() contentComponentType: any;
    @Input() okText: string;
    @Input() okClass: 'btn-primary' | 'btn-success' | 'btn-warning' | 'btn-danger' | 'btn-danger';
    @Input() cancelText: string;

    @Input() disableOk: boolean;
    @Input() hideCancel: boolean;

    ok = new EventEmitter<void>();
    cancel = new EventEmitter<void>();

    readonly contentInstance$ = new Subject();

    constructor() {}

    ngOnInit() {}

    onOk() {
        this.ok.emit(null);
    }

    onCancel() {
        this.cancel.emit(null);
    }
}
