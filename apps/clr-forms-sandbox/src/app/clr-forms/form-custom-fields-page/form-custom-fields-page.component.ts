import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';
import * as CONSTANTS from './form-custom-fields-page.constants';

const definition: ClrFormLayouts.ClrFormLayout = {
    kind: 'fields',
    fields: [
        {
            id: 'custom',
            kind: 'CustomField'
        },
        {
            id: 'customControl',
            kind: 'CustomField',
            /**
             * Will sync value changes of first component inside custom
             * field template container with form value
             */
            valueAccessor: 'self'
        },
        {
            id: 'customWrappedControl',
            kind: 'CustomField',
            /**
             * Will sync value changes of first component's first child
             * inside custom field template container (this is most common case wrapper -> input)
             * with form value
             */
            valueAccessor: 'first-child',
            validators: [Validators.required]
        }
    ]
};

@Component({
    selector: 'hlc-form-custom-fields-page',
    templateUrl: './form-custom-fields-page.component.html',
    styleUrls: ['./form-custom-fields-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCustomFieldsPageComponent {
    definition = definition;
    CONSTANTS = CONSTANTS;

    constructor() {}
}
