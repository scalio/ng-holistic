import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Optional
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormFooterDataAccess } from '../../form-footer/form-footer.component';
import { defaultModalConfig, HLC_CLR_MODAL_CONFIG, ModalConfig } from './modal.config';

export interface FormProvider {
    form: FormGroup;
    dataAccess?: FormFooterDataAccess;
    // TODO !
    allowOkWhenFormPristine?: boolean;
}

@Component({
    selector: 'hlc-clr-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {
    error: string | undefined;
    @Input() modalSize: 'modal-sm' | 'modal-lg' | 'modal-md' | 'modal-xl' | undefined;
    @Input() title: string;
    @Input() contentComponentType: any;
    @Input() okClass: 'btn-primary' | 'btn-success' | 'btn-warning' | 'btn-danger' | 'btn-danger';
    @Input() okText: string;
    @Input() cancelText: string;
    /**
     * Expect content has form, in this case will be used form-footer component
     */
    @Input() formProvider: FormProvider | undefined;

    @Input() disableOk: boolean;
    @Input() hideCancel: boolean;

    ok = new EventEmitter<void>();
    cancel = new EventEmitter<void>();

    readonly config: ModalConfig;
    readonly contentInstance$ = new Subject();

    constructor(
        private readonly cdr: ChangeDetectorRef,
        @Optional() @Inject(HLC_CLR_MODAL_CONFIG) modalConfig?: ModalConfig
    ) {
        this.config = modalConfig || defaultModalConfig;
    }

    ngOnInit() {}

    onOk() {
        this.ok.emit();
    }

    onCancel() {
        this.cancel.emit();
    }

    onDataAccessError(err: string) {
        this.error = err;
    }

    get okLabel() {
        return this.okText || this.config.labels.okText;
    }

    get cancelLabel() {
        return this.cancelText || this.config.labels.cancelText;
    }

    detectChanges() {
        this.cdr.detectChanges();
    }
}
