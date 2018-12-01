import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';

const group: ClrFormLayouts.ClrFormLayout = {
    kind: 'tabs',
    $content: [
        {
            kind: 'tab',
            title: 'Personal Info',
            $content: [
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
                }
            ]
        },
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
        }
    ]
};

@Component({
    selector: 'hlc-form-groups-page',
    templateUrl: './form-groups-page.component.html',
    styleUrls: ['./form-groups-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupsPageComponent implements AfterViewInit {
    group = group;

    constructor(private readonly cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        // in order to correctly display formGroup.value on init
        this.cdr.detectChanges();
    }
}
