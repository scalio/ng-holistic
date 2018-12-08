import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { AlertModalComponent, AlertType } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ModalComponent } from './modal/modal.component';
import { OverlayService } from './overlay.service';

export interface ModalShowParams {
    title: string;
    contentComponentType: any;
    componentFormField?: string;
    allowOkWhenFormPristine?: boolean;
    finish?: (ok: Observable<any>) => Observable<any>;
}

/**
 * Provides API to show / hide modal.
 */
@Injectable()
export class ModalService {
    private readonly hide$ = new Subject();

    constructor(private readonly overlayService: OverlayService) {}

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

        if (params.finish) {
            result.ok = params
                .finish(
                    result.ok.pipe(
                        withLatestFrom(result.instance$, (_, inst) => inst),
                        map((inst: any) => params.componentFormField && inst[params.componentFormField].value)
                    )
                )
                .pipe(
                    take(1),
                    shareReplay(1)
                );
        }

        result.ok.pipe(take(1)).subscribe(() => this.hide());

        if (params.componentFormField) {
            result.instance$.pipe(take(1)).subscribe((inst: any) => {
                // change ok button state, if modal conntent has form
                const form: FormGroup = inst[params.componentFormField as any];
                result.modalInstance.disableOk = !params.allowOkWhenFormPristine;
                form.valueChanges.pipe(takeUntil(this.hide$)).subscribe(_ => {
                    result.modalInstance.disableOk = !((params.allowOkWhenFormPristine || form.dirty) && form.valid);
                });
                return form;
            });
        }

        return result;
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
