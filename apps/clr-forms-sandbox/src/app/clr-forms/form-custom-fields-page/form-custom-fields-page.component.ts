import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ClrFormLayouts, InputErrorDisplayStartegy } from '@ng-holistic/clr-forms';
import { map } from 'rxjs/operators';

const getDefinition = (formGroup: FormGroup): ClrFormLayouts.ClrFormLayout => ({
    kind: 'fields',
    fields: [
        {
            id: 'custom',
            kind: 'CustomField'
        },
        {
            id: 'toggle',
            kind: 'ToggleField',
            label: 'Show custom control'
        },
        {
            id: 'customControl',
            kind: 'CustomField',
            hidden: formGroup.valueChanges.pipe(map(val => !val.toggle)),
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
});

const definition = `
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
`;

const html = `
<hlc-clr-form [group]="group" #clrForm>
    <!-- Custom field as simple text -->
    <ng-template hlcCustomField="custom">
        <p>any content of template could be custom field</p>
    </ng-template>
    <!-- Custom field could be any template associated with 'hlcCustomField' directve -->
    <!-- This case its just an input component -->
    <hlc-clr-text *hlcCustomField="'customControl'"></hlc-clr-text>
    <!--
        Custom field could be any tree of components inside template associated with 'hlcCustomField' directive,
        which component's value changes should be sync with form control defined by the 'valueAccessor'
        property of the field, in this example this is 'hlc-clr-text' input,
        which defined by "valueAccessor: 'first-child'"
    -->
    <ng-template hlcCustomField="customWrappedControl" let-control="control">
        <hlc-clr-input-container label="Custom field in wrapper" [formControl]="control">
            <hlc-clr-text></hlc-clr-text>
        </hlc-clr-input-container>
    </ng-template>
</hlc-clr-form>
`;

@Component({
    selector: 'hlc-form-custom-fields-page',
    templateUrl: './form-custom-fields-page.component.html',
    styleUrls: ['./form-custom-fields-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputErrorDisplayStartegy]
})
export class FormCustomFieldsPageComponent implements AfterViewInit {
    group = getDefinition;
    definition = definition;
    html = html;

    constructor(private readonly cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        // in order to correctly display formGroup.value on init
        this.cdr.detectChanges();
    }
}
