import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { CustomFieldDirective, FormLayoutConfig, HLC_FORM_EXTRACT_FIELDS, IFormGroup } from '@ng-holistic/forms';
import { flatGroup } from './form-utils';

@Component({
    selector: 'hlc-clr-form',
    templateUrl: './form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: HLC_FORM_EXTRACT_FIELDS,
            useValue: (group: IFormGroup<any>) => flatGroup(group)
        }
    ]
})
export class ClrFormComponent {
    @Input()
    group: FormLayoutConfig | undefined;

    @ContentChildren(CustomFieldDirective)
    customFields: QueryList<CustomFieldDirective>;
}
