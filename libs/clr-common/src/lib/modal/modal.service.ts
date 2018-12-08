import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { flatMap, map, shareReplay, take } from 'rxjs/operators';
import { DataAccess } from '../form-footer/form-footer.component';
import { AlertModalComponent, AlertType } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormProvider, ModalComponent } from './modal/modal.component';
import { OverlayService } from './overlay.service';

export interface ModalShowParams {
    title: string;
    contentComponentType: any;
}

export interface ModalShowFormParams extends ModalShowParams {
    componentFormField: string;
    dataAccess: DataAccess;
    allowOkWhenFormPristine?: boolean;
}

/**
 * Provides API to show / hide modal.
 */
@Injectable()
export class ModalService {
    private readonly hide$ = new Subject();

    constructor(private readonly overlayService: OverlayService) {}

    // TODOD : separate showForm
    show<T>(params: ModalShowParams) {
        const { backdropClick, instance } = this.overlayService.showComponent<ModalComponent>(ModalComponent, {
            position: 'center'
        });

        instance.title = params.title;
        instance.contentComponentType = params.contentComponentType;

        backdropClick.subscribe(() => {
            this.hide();
        });

        instance.cancel.subscribe(() => this.hide());

        const result = {
            instance$: instance.contentInstance$.asObservable() as Observable<T>,
            modalInstance: instance,
            ok: instance.ok.asObservable()
        };

        result.ok.pipe(take(1)).subscribe(() => this.hide());

        return result;
    }

    showForm<T>(params: ModalShowFormParams) {
        const result = this.show<T>(params);

        // ok after update success
        const res$ = result.instance$.pipe(
            take(1),
            flatMap((inst: any) => {
                // form could be observable
                const form: FormGroup | Observable<FormGroup> = inst[params.componentFormField as any];
                return form instanceof Observable ? form : of(form);
            }),
            map(form => this.initForm(result, form, params)),
            shareReplay(1)
        );

        res$.subscribe(() => {});

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

        return dataAccess.updateSuccess$ as Observable<any>;
    }

    hide() {
        this.hide$.next();
        this.overlayService.hide();
    }

    confirm(title: string, message: string) {
        const { instance$, ok } = this.show<ConfirmModalComponent>({
            title: title,
            contentComponentType: ConfirmModalComponent
        });

        instance$.pipe(take(1)).subscribe(inst => {
            inst.message = message;
        });

        return ok;
    }

    alert(title: string, message: string, alertType: AlertType) {
        const { instance$, ok, modalInstance } = this.show<AlertModalComponent>({
            title: title,
            contentComponentType: AlertModalComponent
        });

        modalInstance.hideCancel = true;

        instance$.pipe(take(1)).subscribe(inst => {
            inst.alertType = alertType;
            inst.message = message;
        });

        return ok;
    }
}
