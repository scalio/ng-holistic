import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Optional, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalConfig, HLC_CLR_MODAL_CONFIG, defaultModalConfig } from './modal.config';

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
    @Input() okClass: 'btn-primary' | 'btn-success' | 'btn-warning' | 'btn-danger' | 'btn-danger';
    @Input() okText: string;
    @Input() cancelText: string;

    @Input() disableOk: boolean;
    @Input() hideCancel: boolean;

    ok = new EventEmitter<void>();
    cancel = new EventEmitter<void>();

    readonly config: ModalConfig;
    readonly contentInstance$ = new Subject();

    constructor(@Optional() @Inject(HLC_CLR_MODAL_CONFIG) modalConfig?: ModalConfig) {
        this.config = modalConfig || defaultModalConfig;
    }

    ngOnInit() {}

    onOk() {
        this.ok.emit();
    }

    onCancel() {
        this.cancel.emit();
    }

    get okLabel() { return this.okText || this.config.labels.okText; }

    get cancelLabel() { return this.cancelText || this.config.labels.cancelText; }
}
