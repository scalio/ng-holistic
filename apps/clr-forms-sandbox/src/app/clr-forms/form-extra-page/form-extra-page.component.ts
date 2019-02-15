import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { TextMask } from '@ng-holistic/clr-controls';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';
import { HlcFormComponent } from '@ng-holistic/forms';
import { map } from 'rxjs/operators';

const group: ClrFormLayouts.ClrFormLayout = {
    kind: 'fields',
    fields: [
        {
            id: 'text',
            kind: 'TextField',
            props: {
                label: 'Text',
                placeholder: 'Type something'
            }
        },
        {
            id: 'num',
            kind: 'MaskField',
            props: {
                label: 'Number',
                placeholder: '0000000',
                mask: TextMask.int(7),
                unmask: TextMask.unmaskNumber
            }
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
            props: {
                label: 'Text Area',
                placeholder: 'Type something'
            }
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
            props: {
                label: 'Select',
                items: [{ key: 'one', label: 'one' }, { key: 'two', label: 'two' }, { key: 'three', label: 'three' }]
            }
        },
        {
            id: 'typeahead',
            kind: 'TypeaheadField',
            props: {
                label: 'Typeahead',
                config: {
                    search: text$ =>
                        text$.pipe(
                            map(args =>
                                [
                                    { key: 'one', label: 'one' },
                                    { key: 'two', label: 'two' },
                                    { key: 'three', label: 'three' }
                                ].filter(f =>
                                    args.kind === 'SearchArgTyping' ? !args.term || f.label.startsWith(args.term) : true
                                )
                            )
                        )
                }
            }
        },
        {
            id: 'tags',
            kind: 'TagsField',
            props: {
                label: 'Tags',
                config: {
                    search: text$ =>
                        text$.pipe(
                            map(args =>
                                [
                                    { key: 'one', label: 'one' },
                                    { key: 'two', label: 'two' },
                                    { key: 'three', label: 'three' }
                                ].filter(f =>
                                    args.kind === 'SearchArgTyping' ? !args.term || f.label.startsWith(args.term) : true
                                )
                            )
                        )
                }
            }
        },
        {
            id: 'toggle',
            kind: 'ToggleField',
            props: {
                label: 'Toggle',
                text: 'Use feature'
            }
        },
        {
            id: 'options',
            kind: 'OptionsField',
            props: {
                label: 'Options',
                items: [{ key: 'opt1', label: 'opt1' }, { key: 'opt2', label: 'opt2' }]
            }
        },
        {
            id: 'checkboxes',
            kind: 'CheckboxesField',
            props: {
                label: 'Checkboxes',
                items: [{ key: 'chk1', label: 'chk1' }, { key: 'chk2', label: 'chk2' }]
            }
        }
    ]
};

@Component({
    selector: 'hlc-form-extra-page',
    templateUrl: './form-extra-page.component.html',
    styleUrls: ['./form-extra-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormExtraPageComponent implements AfterViewInit {
    group = group;

    @ViewChild(HlcFormComponent) form: HlcFormComponent;

    constructor(readonly cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        // in order to correctly display formGroup.value on init
        this.cdr.detectChanges();
    }
}
