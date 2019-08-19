import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';
// This is for the sample info, ignore it
import * as CONSTANTS from './form-error-display-strategy-page.consts';

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
    selector: 'hlc-form-error-display-strategy-page',
    templateUrl: './form-error-display-strategy-page.component.html'
})
export class FormErrorDisplayStrategyPageComponent {
    // This is for the sample info, ignore it
    CONSTANTS = CONSTANTS;
    definition = definition;

    constructor() {}
}
