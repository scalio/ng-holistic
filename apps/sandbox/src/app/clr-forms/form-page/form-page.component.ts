import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TextMask } from '@ng-holistic/clr-controls';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';
import { throwError, timer } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { FormFooterDataAccess } from '@ng-holistic/clr-common';

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
            id: 'num',
            kind: 'MaskField',
            label: 'Number',
            placeholder: '0000000',
            mask: TextMask.int(7),
            unmask: TextMask.unmaskNumber
        },
        {
            id: 'phone',
            kind: 'PhoneField',
            label: 'Phone'
        },
        {
            id: 'password',
            kind: 'PasswordField',
            label: 'Password'
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

    readonly dataAccess: FormFooterDataAccess = {
        update(_: any) {
            return timer(1000).pipe(flatMap(() => throwError('This is error')));
        }
    };

    constructor(private readonly cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        // in order to correctly display formGroup.value on init
        this.cdr.detectChanges();
    }

    onSave(val: any) {
        // alert(JSON.stringify(val, null, 2));
        console.log(val);
    }
}
