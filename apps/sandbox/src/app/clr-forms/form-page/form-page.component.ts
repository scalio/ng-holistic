import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';

const group: ClrFormLayouts.ClrFormLayout = {
    kind: 'fields',
    fields: [
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
            id: 'date-time',
            kind: 'DateTimeField',
            label: 'Date Time'
        },
        {
            id: 'date-range',
            kind: 'DateRangeField',
            label: 'Date Range'
        },
        {
            id: 'select',
            kind: 'SelectField',
            label: 'Select',
            items: [{ key: 'one', label: 'one' }, { key: 'two', label: 'two' }]
        },
        {
            id: 'toggle',
            kind: 'ToggleField',
            label: 'Toggle',
            text: 'Use feature'
        },
        {
            id: 'options',
            kind: 'OptionsField',
            label: 'Options',
            items: [{ key: 'opt1', label: 'opt1' }, { key: 'opt2', label: 'opt2' }]
        },
        {
            id: 'checkboxes',
            kind: 'CheckboxesField',
            label: 'Checkboxes',
            items: [{ key: 'chk1', label: 'chk1' }, { key: 'chk2', label: 'chk2' }]
        }
    ]
};

@Component({
    selector: 'hlc-form-page',
    templateUrl: './form-page.component.html',
    styleUrls: ['./form-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPageComponent implements AfterViewInit {
    group = group;

    constructor(private readonly cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        // in order to correctly display formGroup.value on init
        this.cdr.detectChanges();
    }

    onSave(val: any) {
        alert(JSON.stringify(val, null, 2));
    }
}
