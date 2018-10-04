import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputContainerComponent } from '@ng-holistic/clr-forms';
import { HLC_FORM_FIELD_WRAPPER } from '@ng-holistic/forms';

const fields = [
    {
        id: 'text',
        kind: 'TextField',
        label: 'Text',
        placeholder: 'Type something'
    },
    {
        id: 'textarea',
        kind: 'TextAreaField',
        label: 'Text Area',
        placeholder: 'Type something'
    },
    {
        id: 'date',
        kind: 'DateField',
        label: 'Date'
    },
    {
        id: 'select',
        kind: 'SelectField',
        label: 'Select',
        items: [{ key: 'one', label: 'one' }, { key: 'two', label: 'two' }]
    }
];

@Component({
    selector: 'hlc-wrapped-fields-layout-page',
    templateUrl: './wrapped-fields-layout-page.component.html',
    styleUrls: ['./wrapped-fields-layout-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: HLC_FORM_FIELD_WRAPPER, useValue: InputContainerComponent }]
})
export class WrappedFiedlsLayoutComponent implements OnInit {
    fields = fields;
    formGroup: FormGroup;

    constructor(fb: FormBuilder) {
        this.formGroup = fb.group({
            text: [''],
            textarea: [''],
            date: [null],
            select: [null]
        });
    }

    ngOnInit() {}
}
