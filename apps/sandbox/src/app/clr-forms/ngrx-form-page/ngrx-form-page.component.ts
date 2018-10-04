/*
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { TextMask } from '@ng-holistic/clr-controls';
import { FormLayoutComponent } from '@ng-holistic/clr-forms';
import { FormLayout } from '@ng-holistic/forms';
import { SubFormActions } from '@ng-holistic/ngrx-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPage, SubFormAction } from './store';
import { NgrxPageStateModel } from './store/models';

const config: FormLayout.Form = {
    content: {
        kind: 'FormFieldsCollection',
        items: [
            {
                kind: 'TextField',
                id: 'name',
                label: 'Name'
            },
            {
                kind: 'DateField',
                id: 'date',
                label: 'Date'
            },
            {
                kind: 'SelectField',
                id: 'color',
                label: 'Items'
            },
            {
                kind: 'TextareaField',
                id: 'description',
                label: 'Description'
            },
            {
                kind: 'MaskField',
                id: 'age',
                label: 'Age',
                mask: TextMask.int(3),
                unmask: TextMask.unmaskNumber
            }
        ]
    }
};

@Component({
    selector: 'hlc-ngrx-form-page',
    templateUrl: './ngrx-form-page.component.html',
    styleUrls: ['./ngrx-form-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxFormPageComponent implements OnInit {
    readonly page$: Observable<NgrxPageStateModel>;
    config = config;

    @ViewChild('layout') layout: FormLayoutComponent;

    constructor(private readonly store: Store<any>) {
        this.page$ = store.select(selectPage);
    }

    ngOnInit() {}

    private get form() {
        return this.layout && this.layout.formGroup;
    }

    onSave() {
        this.store.dispatch(new SubFormAction(new SubFormActions.Update(this.form.value)));
    }

    onCancel() {
        // this.store.dispatch(new SubFormAction(new SubFormActions.Update(this.form.value)));
    }
}
*/
