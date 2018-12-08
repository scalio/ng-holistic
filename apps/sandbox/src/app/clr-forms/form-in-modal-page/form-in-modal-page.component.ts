import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputErrorDisplayStartegy } from '@ng-holistic/clr-forms';
import { ModalService } from '@ng-holistic/clr-common';
import { FormRecalcPageComponent } from '../form-recalc-page/form-recalc-page.component';
import { timer } from 'rxjs';

@Component({
    selector: 'hlc-form-in-modal-page',
    templateUrl: './form-in-modal-page.component.html',
    styleUrls: ['./form-in-modal-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputErrorDisplayStartegy]
})
export class FormInModalPageComponent {
    constructor(private readonly modalService: ModalService) {}

    onShowModal() {
        this.modalService.showForm({
            title: 'Form in modal',
            componentFormField: 'form',
            contentComponentType: FormRecalcPageComponent,
            dataAccess: {
                update(_) {
                    return timer(1000);
                }
            }
        });
    }
}
