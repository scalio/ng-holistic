import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormFooterDataAccess, HlcClrFormFooterComponent } from '../../form-footer/form-footer.component';
import { HlcHotkeysContainerService } from '../../hotkeys/hotkeys-container.service';
import { hlcClrDefaultModalConfig, HlcClrModalConfig, HLC_CLR_MODAL_CONFIG } from './modal.config';
import { HlcModalKeysManagerService } from './utils/modal-keys-manager.service';

export interface FormProvider {
    form: FormGroup;
    dataAccess?: FormFooterDataAccess;
    allowOkWhenFormPristine?: boolean;
}

export type ModalSize = 'modal-sm' | 'modal-lg' | 'modal-md' | 'modal-xl';

@Component({
    selector: 'hlc-clr-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [HlcHotkeysContainerService, HlcModalKeysManagerService]
})
export class HlcClrModalComponent implements OnInit, OnDestroy {
    error: string | undefined;
    @Input() modalSize: ModalSize | undefined;
    @Input() title: string;
    @Input() contentComponentType: any;
    @Input() contentComponentTemplate: TemplateRef<any>;
    @Input() okClass: 'btn-primary' | 'btn-success' | 'btn-warning' | 'btn-danger' | 'btn-danger';
    @Input() okText: string;
    @Input() cancelText: string;
    @Input() hideFooter = false;
    @Input() fixedHeight = false;
    @Input() inOverlay = true;
    /**
     * Expect content has form, in this case will be used form-footer component
     */
    @Input() formProvider: FormProvider | undefined;

    @Input() disableOk: boolean;
    @Input() hideCancel: boolean;

    //@ts-ignore
    @ViewChild(HlcClrFormFooterComponent, { static: false }) formFooter: HlcClrFormFooterComponent | undefined;

    // Will emit event when ok clicked, if formProvider defined on component
    // it will emit event after update was successfully executed
    @Output() ok = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<void>();

    readonly config: HlcClrModalConfig;
    readonly contentInstance$ = new Subject();

    constructor(
        private readonly cdr: ChangeDetectorRef,
        keysManager: HlcModalKeysManagerService,
        private readonly hotkeysContainer: HlcHotkeysContainerService,
        @Optional() @Inject(HLC_CLR_MODAL_CONFIG) modalConfig?: HlcClrModalConfig
    ) {
        this.config = modalConfig || hlcClrDefaultModalConfig;
        hotkeysContainer.focus$.next(true);

        keysManager.cancel$.pipe(takeUntil(this.hotkeysContainer.destroy$)).subscribe(() => {
            if (this.formFooter) {
                this.formFooter.onCancel();
            } else {
                this.onCancel();
            }
        });
        keysManager.ok$.pipe(takeUntil(this.hotkeysContainer.destroy$)).subscribe(() => {
            if (this.formFooter) {
                this.formFooter.onSave();
            } else {
                this.onOk();
            }
        });
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.hotkeysContainer.destroy$.next();
    }

    onOk() {
        this.ok.emit();
    }

    onCancel() {
        this.cancel.emit();
    }

    onDataAccessSuccess(res: any) {
        this.ok.emit(res);
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
