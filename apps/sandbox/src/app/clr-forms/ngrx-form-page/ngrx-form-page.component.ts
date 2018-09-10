import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TextMask } from '@ng-holistic/clr-controls';
import { FormLayoutComponent } from '@ng-holistic/clr-forms';
import { FormLayout } from '@ng-holistic/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectPage, SubFormAction } from './store';
import { NgrxPageStateModel } from './store/models';
import { SubFormActions } from '@ng-holistic/ngrx-forms';

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
                label: 'Items',
                items: [
                    {
                        key: 'one',
                        label: 'one'
                    },
                    {
                        key: 'two',
                        label: 'two'
                    }
                ]
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
export class NgrxFormPageComponent implements OnInit, OnDestroy, AfterViewInit {
    destroy$ = new Subject();
    readonly page$: Observable<NgrxPageStateModel>;
    config = config;

    @ViewChild('layout') layout: FormLayoutComponent;

    constructor(private readonly store: Store<any>) {
        this.page$ = store.select(selectPage);
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.destroy$.next();
    }

    ngAfterViewInit() {
        this.page$.pipe(takeUntil(this.destroy$)).subscribe(page => {
            if (this.form && page.item) {
                this.form.patchValue(page.item);
            }
        });
    }

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
