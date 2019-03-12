import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    Optional,
    Output,
    QueryList,
    SkipSelf,
    ViewChild
} from '@angular/core';
import {
    CustomFieldDirective,
    CustomFieldsProvider,
    FormLayoutConfig,
    HlcFormComponent,
    HLC_FORM_CUSTOM_FIELDS_PROVIDER,
    HLC_FORM_EXTRACT_FIELDS
} from '@ng-holistic/forms';
import { flatGroup } from './form-utils';

@Component({
    selector: 'hlc-clr-form',
    templateUrl: './form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: HLC_FORM_EXTRACT_FIELDS,
            useValue: flatGroup
        },
        {
            provide: HLC_FORM_CUSTOM_FIELDS_PROVIDER,
            useExisting: forwardRef(() => HlcClrFormComponent)
        }
    ]
})
export class HlcClrFormComponent implements CustomFieldsProvider {
    @Input() id: any | undefined;
    @Input() group: FormLayoutConfig | undefined;
    @Input() value: any | undefined;

    @Output() formValueChanged = new EventEmitter<any>();

    @ViewChild(HlcFormComponent) form: HlcFormComponent;

    @ContentChildren(CustomFieldDirective)
    contentCustomFields: QueryList<CustomFieldDirective>;

    constructor(
        @Inject(HLC_FORM_CUSTOM_FIELDS_PROVIDER)
        @Optional()
        @SkipSelf()
        private readonly customFieldsProvider: CustomFieldsProvider | undefined
    ) {}

    get customFields() {
        return [
            ...this.contentCustomFields.toArray(),
            ...(this.customFieldsProvider ? this.customFieldsProvider.customFields || [] : [])
        ];
    }

    get formGroup() {
        return this.form && this.form.formGroup;
    }
}
