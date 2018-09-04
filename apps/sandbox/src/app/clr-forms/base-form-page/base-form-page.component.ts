import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormLayout } from '@ng-holistic/forms';

const config: FormLayout.Form = {
    content: {
        kind: 'FormTabsCollection',
        items: [
            {
                title: 'Fields',
                content: {
                    kind: 'FormFieldsCollection',
                    items: []
                }
            },
            {
                title: 'Groups',
                content: {
                    kind: 'FormGroupsCollection',
                    items: [
                        {
                            title: 'Group A',
                            content: {
                                kind: 'FormFieldsCollection',
                                items: []
                            }
                        }
                    ]
                }
            }
        ]
    }
};

@Component({
    selector: 'hlc-base-form-page',
    templateUrl: './base-form-page.component.html',
    styleUrls: ['./base-form-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseFormPageComponent implements OnInit {
    config = config;

    constructor() {}

    ngOnInit() {}
}
