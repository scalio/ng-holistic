import { Injectable, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isNil } from 'ramda';
import { merge, Observable, of, Subject } from 'rxjs';
import { filter, flatMap, mapTo, shareReplay, take, takeUntil } from 'rxjs/operators';
import { AlertType } from '../common.types';
import { FormFooterDataAccess } from '../form-footer/form-footer.component';
import { HlcClrAlertModalComponent } from './alert-modal/alert-modal.component';
import { HlcClrConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormProvider, HlcClrModalComponent } from './modal/modal.component';
import { HlcClrOverlayService } from './overlay.service';

export interface ModalShowParams {
    title: string;
    contentComponentType: any;
    // default true
    hideOnClickOverlay?: boolean;
    hideFooter?: boolean;
}

export interface ModalShowTemplateParams {
    title: string;
    contentComponentTemplate: TemplateRef<any>;
    hideFooter: boolean;
    // default true
    hideOnClickOverlay?: boolean;
}

export interface ModalShowFormParams extends ModalShowParams {
    componentFormField: string;
    dataAccess: FormFooterDataAccess;
    allowOkWhenFormPristine?: boolean;
    value?: any;
    closeOnOk?: boolean;
    // default false, since we dont wont user lost entered data when ocasionally click on background
    hideOnClickOverlay?: boolean;
    // Will emit both ok (value from form) and cancel (null) events
    emitOkCancel?: boolean;
}

export interface ShowModalResult<T> {
    instance$: Observable<T>;
    modalInstance: HlcClrModalComponent;
    ok: Observable<any>;
    cancel: Observable<any>;
}

export interface ConfirmParams {
    okText?: string;
    cancelText?: string;
    // Will emit both ok (true) and cancel (false) events
    emitOkCancel?: boolean;
}

/**
 * Provides API to show / hide modal.
 */
@Injectable()
export class HlcClrModalService {
    private readonly hide$ = new Subject();

    constructor(private readonly overlayService: HlcClrOverlayService) {}

    show<T>(params: ModalShowParams): ShowModalResult<T> {
        const { backdropClick, instance } = this.overlayService.showComponent<HlcClrModalComponent>(
            HlcClrModalComponent,
            {
                position: 'center'
            }
        );

        instance.title = params.title;
        instance.contentComponentType = params.contentComponentType;
        instance.hideFooter = params.hideFooter || false;

        const hideOnClickOverlay = isNil(params.hideOnClickOverlay) ? true : params.hideOnClickOverlay;

        const cancelOnBackdrop$ = new Subject();
        if (hideOnClickOverlay) {
            backdropClick.pipe(takeUntil(this.hide$)).subscribe(() => {
                cancelOnBackdrop$.next();
                this.hide();
            });
        }

        instance.cancel.pipe(takeUntil(this.hide$)).subscribe(() => this.hide());

        const result = {
            instance$: instance.contentInstance$.pipe(shareReplay(1)) as Observable<T>,
            modalInstance: instance,
            ok: instance.ok.asObservable(),
            cancel: merge(instance.cancel.asObservable(), cancelOnBackdrop$)
        };

        result.ok
            .pipe(
                take(1),
                takeUntil(this.hide$)
            )
            .subscribe(() => this.hide());

        return result;
    }

    showTemplate<T>(params: ModalShowTemplateParams): ShowModalResult<T> {
        const { backdropClick, instance } = this.overlayService.showComponent<HlcClrModalComponent>(
            HlcClrModalComponent,
            {
                position: 'center'
            }
        );

        instance.title = params.title;
        instance.contentComponentTemplate = params.contentComponentTemplate;
        instance.hideFooter = params.hideFooter;

        const hideOnClickOverlay = isNil(params.hideOnClickOverlay) ? true : params.hideOnClickOverlay;

        if (hideOnClickOverlay) {
            backdropClick.pipe(takeUntil(this.hide$)).subscribe(() => {
                this.hide();
            });
        }

        instance.cancel.pipe(takeUntil(this.hide$)).subscribe(() => this.hide());

        const result = {
            instance$: instance.contentInstance$.pipe(shareReplay(1)) as Observable<T>,
            modalInstance: instance,
            ok: instance.ok.asObservable(),
            cancel: instance.cancel.asObservable()
        };

        result.ok
            .pipe(
                take(1),
                takeUntil(this.hide$)
            )
            .subscribe(() => this.hide());

        return result;
    }

    showForm<T>(params: ModalShowFormParams): ShowModalResult<T> {
        const result = this.show<T>(params);

        // initialize modal instance with formProvider
        const initInst$ = result.instance$.pipe(
            flatMap((inst: any) => {
                // form could be observable
                const form: FormGroup | Observable<FormGroup | null> = inst[params.componentFormField as any];
                return form instanceof Observable ? form : of(form);
            }),
            // form obsrevable is cold stream and at the beggining has null (unitialized) form,
            // just wait till form will be initilaized
            filter(f => !!f),
            take(1),
            shareReplay(1)
        );

        initInst$.subscribe(form => {
            if (form) {
                // Set formProvider and other form properties from config
                this.initForm(result, form, params);
            }
        });

        if (params.emitOkCancel) {
            result.ok = merge(result.ok, result.cancel.pipe(mapTo(null)));
        }

        if (params.closeOnOk !== false) {
            result.ok = result.ok.pipe(take(1));
        }

        result.ok.pipe(takeUntil(this.hide$)).subscribe(() => {}, () => {}, () => this.hide());

        return result;
    }

    private initForm(result: any, form: FormGroup, params: ModalShowFormParams) {
        const updateSuccess$ = new Subject<any>();
        const dataAccess = params.dataAccess.updateSuccess$
            ? params.dataAccess
            : // setup default update success
              {
                  update: params.dataAccess.update,
                  updateSuccess$
              };

        const formProvider: FormProvider = {
            form,
            dataAccess,
            allowOkWhenFormPristine: params.allowOkWhenFormPristine
        };

        // initialize modal instance form provider it will be used when user click ok button
        result.modalInstance.formProvider = formProvider;

        if (params.value) {
            form.patchValue(params.value);
        }
    }

    hide() {
        this.hide$.next();
        this.overlayService.hide();
    }

    confirm(title: string, message: string, confirmParams?: ConfirmParams) {
        const { instance$, ok, cancel, modalInstance } = this.show<HlcClrConfirmModalComponent>({
            title: title,
            contentComponentType: HlcClrConfirmModalComponent
        });

        if (confirmParams) {
            if (confirmParams.okText) {
                modalInstance.okText = confirmParams.okText;
            }
            if (confirmParams.cancelText) {
                modalInstance.cancelText = confirmParams.cancelText;
            }
        }

        instance$
            .pipe(
                takeUntil(this.hide$),
                take(1)
            )
            .subscribe(inst => {
                inst.message = message;
            });

        if (confirmParams && confirmParams.emitOkCancel) {
            return merge(ok.pipe(mapTo(true)), cancel.pipe(mapTo(false)));
        } else {
            return ok;
        }
    }

    alert(title: string, message: string, alertType: AlertType) {
        const { instance$, ok, modalInstance } = this.show<HlcClrAlertModalComponent>({
            title: title,
            contentComponentType: HlcClrAlertModalComponent
        });
        modalInstance.hideCancel = true;

        instance$
            .pipe(
                takeUntil(this.hide$),
                take(1)
            )
            .subscribe(inst => {
                inst.alertType = alertType;
                inst.message = message;
            });

        return ok;
    }
}
