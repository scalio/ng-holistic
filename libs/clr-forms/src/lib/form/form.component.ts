import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild
} from '@angular/core';
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
    @Input() id: any | undefined;
    @Input() group: FormLayoutConfig | undefined;
    @Input() value: any | undefined;

    @Output() formValueChanged = new EventEmitter<any>();

    @ViewChild(FormComponent) form: FormComponent;

    @ContentChildren(CustomFieldDirective)
    customFields: QueryList<CustomFieldDirective>;
}
