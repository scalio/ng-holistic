import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HlcClrModalService } from '@ng-holistic/clr-common';
import { throwError, timer } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
    selector: 'hlc-clr-sandbox-modal-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <form clrForm [formGroup]="form">
            <clr-input-container>
                <label>Text</label> <input clrInput type="text" formControlName="text" />
            </clr-input-container>
        </form>
    `
})
export class ModalPageFormComponent implements OnInit {
    readonly form: FormGroup;

    constructor(fb: FormBuilder) {
        this.form = fb.group({ text: ['', [Validators.required]] });
    }

    ngOnInit() {}
}

@Component({
    selector: 'hlc-clr-sandbox-modal-page',
    templateUrl: './modal-page.component.html',
    styleUrls: ['./modal-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalPageComponent implements OnInit {
    constructor(private readonly modalService: HlcClrModalService) {}

    ngOnInit() {}

    onForm() {
        this.modalService.showForm({
            title: 'Title',
            componentFormField: 'form',
            contentComponentType: ModalPageFormComponent,
            dataAccess: {
                update() {
                    return timer(1000).pipe(flatMap(() => throwError('Error !')));
                }
            }
        });
    }

    onAlert() {
        this.modalService.alert('Title', 'Success message', 'success');
    }
}
