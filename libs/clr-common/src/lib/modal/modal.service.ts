import { Injectable, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { flatMap, map, shareReplay, take, takeUntil } from 'rxjs/operators';
import { AlertType } from '../common.types';
import { FormFooterDataAccess } from '../form-footer/form-footer.component';
import { HlcClrAlertModalComponent } from './alert-modal/alert-modal.component';
import { HlcClrConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormProvider, HlcClrModalComponent } from './modal/modal.component';
import { HlcClrOverlayService } from './overlay.service';

export interface ModalShowParams {
    title: string;
    contentComponentType: any;
}

export interface ModalShowTemplateParams {
    title: string;
    contentComponentTemplate: TemplateRef<any>;
    hideFooter: boolean;
}

export interface ModalShowFormParams extends ModalShowParams {
    componentFormField: string;
    dataAccess: FormFooterDataAccess;
    allowOkWhenFormPristine?: boolean;
    value?: any;
    closeOnOk?: boolean;
}

export interface ShowModalResult<T> {
    instance$: Observable<T>;
    modalInstance: HlcClrModalComponent;
    ok: Observable<void>;
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

        backdropClick.pipe(takeUntil(this.hide$)).subscribe(() => {
            this.hide();
        });

        instance.cancel.pipe(takeUntil(this.hide$)).subscribe(() => this.hide());

        const result = {
            instance$: instance.contentInstance$.pipe(shareReplay(1)) as Observable<T>,
            modalInstance: instance,
            ok: instance.ok.asObservable()
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

        backdropClick.pipe(takeUntil(this.hide$)).subscribe(() => {
            this.hide();
        });

        instance.cancel.pipe(takeUntil(this.hide$)).subscribe(() => this.hide());

        const result = {
            instance$: instance.contentInstance$.pipe(shareReplay(1)) as Observable<T>,
            modalInstance: instance,
            ok: instance.ok.asObservable()
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

        // ok after update success
        const res$ = result.instance$.pipe(
            flatMap((inst: any) => {
                // form could be observable
                const form: FormGroup | Observable<FormGroup> = inst[params.componentFormField as any];
                return form instanceof Observable ? form : of(form);
            }),
            take(1),
            map(form => this.initForm(result, form, params)),
            shareReplay(1),
            takeUntil(this.hide$)
        );

        res$.subscribe(() => {
            result.modalInstance.detectChanges();
        });

        result.ok = res$.pipe(flatMap(x => x));

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
            : {
                  update: params.dataAccess.update,
                  updateSuccess$
              };

        const formProvider: FormProvider = {
            form,
            dataAccess,
            allowOkWhenFormPristine: params.allowOkWhenFormPristine
        };

        result.modalInstance.formProvider = formProvider;

        if (params.value) {
            form.patchValue(params.value);
        }

        return dataAccess.updateSuccess$ as Observable<any>;
    }

    hide() {
        this.hide$.next();
        this.overlayService.hide();
    }

    confirm(title: string, message: string) {
        const { instance$, ok } = this.show<HlcClrConfirmModalComponent>({
            title: title,
            contentComponentType: HlcClrConfirmModalComponent
        });

        instance$
            .pipe(
                takeUntil(this.hide$),
                take(1)
            )
            .subscribe(inst => {
                inst.message = message;
            });

        return ok;
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
