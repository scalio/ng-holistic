import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';
// This is for the sample info, ignore it
import * as CONSTANTS from './form-page-error-display-strategy.consts';

const definition: ClrFormLayouts.ClrFormLayout = {
    kind: 'fields',
    fields: [
        {
            id: 'text',
            kind: 'TextField',
            props: {
                label: 'Text',
                placeholder: 'Type something'
            },
            validators: [Validators.required]
        }
    ]
};

@Component({
    selector: 'hlc-form-page-error-display-strategy',
    templateUrl: './form-page-error-display-strategy.component.html'
})
export class FormPageErrorDisplayStrategyComponent {
    // This is for the sample info, ignore it
    CONSTANTS = CONSTANTS;
    definition = definition;

    constructor() {}
}
