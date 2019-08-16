import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { HlcClrModalService, HLC_CONTAINER_DATA } from '@ng-holistic/clr-common';
import { HlcClrFormComponent, InputErrorDisplayStartegy } from '@ng-holistic/clr-forms';
import { HLC_FIELDS_LAYOUT_CONFIG } from '@ng-holistic/forms';
import { timer } from 'rxjs';
import { definition as getDefinition } from '../form-recalc-page/form-recalc-page.component';

@Component({
    selector: 'hlc-form-in-modal',
    template: `
        <h5>{{ data.hint }}</h5>
        <hlc-clr-form [group]="group"></hlc-clr-form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        InputErrorDisplayStartegy,
        { provide: HLC_FIELDS_LAYOUT_CONFIG, useValue: { formClass: 'clr-form clr-form-compact' } }
    ]
})
export class FormInModalComponent {
    constructor(@Inject(HLC_CONTAINER_DATA) public data: any) {}

    group = getDefinition;

    @ViewChild(HlcClrFormComponent, { static: false }) clrForm: HlcClrFormComponent;

    get form$() {
        return this.clrForm.form.formCreated;
    }
}


const code = `
import { CommonModule } from '@angular/common';
import { HlcClrModalModule, HlcClrModalService } from '@ng-holistic/clr-common';
import { HlcClrFormModule, HlcClrFormComponent } from '@ng-holistic/clr-forms';
import { NgModule, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

@Component({
    selector: 'hlc-form-in-modal',
    template: '<hlc-clr-form [group]="group"></hlc-clr-form>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInModalComponent {
    group = group;

    @ViewChild(HlcClrFormComponent) clrForm: HlcClrFormComponent;

    get form$() {
        return this.clrForm.form.formCreated;
    }
}

@Component({
    selector: 'hlc-form-in-modal-page',
    template: '<button autofocus class="btn" (click)="onShowModal()">Show Modal</button>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInModalPageComponent {
    constructor(private readonly modalService: HlcClrModalService) {}

    onShowModal() {
        this.modalService.showForm({
            title: 'Form in modal',
            componentFormField: 'form$',
            contentComponentType: FormInModalComponent,
            allowOkWhenFormPristine: false,
            dataAccess: {
                update(_) {
                    return timer(1000);
                }
            }
        });
    }
}


///
@NgModule({
    declarations: [FormInModalPageComponent, FormInModalComponent],
    imports: [CommonModule, HlcClrModalModule, HlcClrFormModule],
    exports: [FormInModalPageComponent],
    entryComponents: [FormInModalComponent]
})
export class FormInModalPageModule {}

`;

@Component({
    selector: 'hlc-form-in-modal-page',
    templateUrl: './form-in-modal-page.component.html',
    styleUrls: ['./form-in-modal-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputErrorDisplayStartegy]
})
export class FormInModalPageComponent {
    definition = getDefinition;
    code = code;

    constructor(private readonly modalService: HlcClrModalService) {}

    onShowModal() {
        this.modalService.showForm({
            title: 'Form in modal',
            data: { hint: 'You can pass some data' },
            componentFormField: 'form$',
            contentComponentType: FormInModalComponent,
            allowOkWhenFormPristine: false,
            dataAccess: {
                update(_) {
                    return timer(1000);
                }
            }
        });
    }
}
