import { Component } from '@angular/core';
import { TextMask } from '@ng-holistic/clr-controls';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';
// This is for the sample info, ignore it
import * as CONSTANTS from './form-use-custom-wrapper-page.consts';
import { HLC_FORM_FIELD_WRAPPER } from '@ng-holistic/forms';
import { CustomFieldWrapperComponent } from './custom-field-wrapper.component';

const definition: ClrFormLayouts.ClrFormLayout = {
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
        }
    ]
};

@Component({
    selector: 'hlc-form-use-custom-wrapper-page',
    templateUrl: './form-use-custom-wrapper-page.component.html',
    styleUrls: ['./form-use-custom-wrapper-page.component.scss'],
    providers: [
        {
            provide: HLC_FORM_FIELD_WRAPPER,
            useValue: CustomFieldWrapperComponent
        }
    ]
})
export class FormUseCustomWrapperPageComponent {
    // This is for the sample info, ignore it
    CONSTANTS = CONSTANTS;
    definition = definition;

    constructor() {}
}
