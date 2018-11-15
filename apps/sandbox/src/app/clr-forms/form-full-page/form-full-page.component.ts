import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

const group = (form: FormGroup): ClrFormLayouts.ClrFormLayout => ({
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
                            items: [{ key: '0', label: 'hide family group' }, { key: '1', label: 'hide address group' }]
                        }
                    ]
                } /*
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
                */,
                {
                    kind: 'group',
                    title: 'Family',
                    $hidden: form.valueChanges.pipe(map(({ select }) => select === '0')),
                    $content: [
                        /*
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
                        }*/
                    ]
                }
            ]
        } /*,
        {
            kind: 'tab',
            title: 'Address',
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
        }*/
    ]
});

@Component({
    selector: 'hlc-form-full-page',
    templateUrl: './form-full-page.component.html',
    styleUrls: ['./form-full-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFullPageComponent implements OnInit {
    group = group;

    constructor() {}

    ngOnInit() {}
}
