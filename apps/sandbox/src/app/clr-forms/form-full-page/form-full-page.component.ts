import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';
import { propChanged } from '@ng-holistic/forms';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const group = (hide$: Observable<boolean>) => (form: FormGroup): ClrFormLayouts.ClrFormLayout => ({
    kind: 'tabs',
    $content: [
        {
            kind: 'tab',
            title: 'Personal Info',
            $content: [
                {
                    kind: 'fields',
                    fields: [
                        {
                            id: 'select',
                            kind: 'SelectField',
                            label: 'Select',
                            items: [
                                { key: '0', label: 'hide family group' },
                                { key: '3', label: 'hide job group' },
                                { key: '1', label: 'hide address group' },
                                { key: '2', label: 'hide custom' }
                            ]
                        },
                        {
                            id: 'custom',
                            kind: 'CustomField',
                            $hidden: form.valueChanges.pipe(map(({ select }) => select === '2'))
                        }
                    ]
                },
                {
                    kind: 'group',
                    title: 'Person Name',
                    $content: [
                        {
                            kind: 'fields',
                            fields: [
                                {
                                    kind: 'TextField',
                                    id: 'firstName',
                                    label: 'First Name'
                                },
                                {
                                    kind: 'TextField',
                                    id: 'lastName',
                                    label: 'Last Name'
                                }
                            ]
                        }
                    ]
                },
                {
                    kind: 'group',
                    title: 'Family',
                    $hidden: form.valueChanges.pipe(map(({ select }) => select === '0')),
                    $content: [
                        {
                            kind: 'fields',
                            fields: [
                                {
                                    kind: 'SelectField',
                                    id: 'maritalStatus',
                                    label: 'Marital Status',
                                    items: [{ key: 'single', label: 'Single' }, { key: 'married', label: 'Married' }]
                                },
                                {
                                    kind: 'SelectField',
                                    id: 'childrenNumber',
                                    label: 'Children Number',
                                    items: [
                                        { key: '1', label: '1' },
                                        { key: '2', label: '2' },
                                        { key: '3', label: '3' },
                                        { key: '3+', label: '3+' }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    kind: 'group',
                    title: 'Job',
                    $hidden: form.valueChanges.pipe(map(({ select }) => select === '3')),
                    $content: [
                        {
                            kind: 'fields',
                            fields: [
                                {
                                    kind: 'TextField',
                                    id: 'occupation',
                                    label: 'Occupation'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            kind: 'tab',
            title: 'Address',
            $hidden: merge(
                hide$,
                form.valueChanges.pipe(
                    propChanged('select'),
                    map(select => select === '1')
                )
            ),
            $content: [
                {
                    kind: 'fields',
                    fields: [
                        {
                            kind: 'TextField',
                            id: 'country',
                            label: 'Country'
                        },
                        {
                            kind: 'TextField',
                            id: 'city',
                            label: 'City'
                        },
                        {
                            kind: 'TextField',
                            id: 'street',
                            label: 'Street'
                        }
                    ]
                }
            ]
        }
    ]
});

@Component({
    selector: 'hlc-form-full-page',
    templateUrl: './form-full-page.component.html',
    styleUrls: ['./form-full-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFullPageComponent implements AfterViewInit {
    hide$ = new BehaviorSubject(false);

    group = group(this.hide$);

    constructor(private readonly cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        // in order to correctly display formGroup.value on init
        this.cdr.detectChanges();
    }

    onHide() {
        this.hide$.next(true);
    }
}
