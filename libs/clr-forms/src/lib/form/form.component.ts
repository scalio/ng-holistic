import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';
import { CustomFieldDirective, FormComponent, FormLayoutConfig, HLC_FORM_EXTRACT_FIELDS } from '@ng-holistic/forms';
import { flatGroup } from './form-utils';

@Component({
    selector: 'hlc-clr-form',
    templateUrl: './form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: HLC_FORM_EXTRACT_FIELDS,
            useValue: flatGroup
        }
    ]
})
export class ClrFormComponent {
    @Input()
    group: FormLayoutConfig | undefined;

    @ViewChild(FormComponent) form: FormComponent;

    @ContentChildren(CustomFieldDirective)
    customFields: QueryList<CustomFieldDirective>;
}
