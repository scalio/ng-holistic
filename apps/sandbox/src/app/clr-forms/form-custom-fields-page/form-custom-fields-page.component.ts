import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ClrFormLayouts, InputErrorDisplayStartegy } from '@ng-holistic/clr-forms';

const group: ClrFormLayouts.ClrFormLayout = {
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputErrorDisplayStartegy]
})
export class FormCustomFieldsPageComponent implements AfterViewInit {
    group = group;

    constructor(private readonly cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        // in order to correctly display formGroup.value on init
        this.cdr.detectChanges();
    }
}
