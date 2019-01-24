import {
    CheckboxesComponent,
    HlcClrCheckboxesModule,
    DateComponent,
    HlcClrDateModule,
    DateRangeComponent,
    HlcClrDateRangeModule,
    DateTimeComponent,
    HlcClrDateTimeModule,
    MaskComponent,
    HlcClrMaskModule,
    OptionsComponent,
    HlcClrOptionsModule,
    SelectComponent,
    HlcClrSelectModule,
    TextAreaComponent,
    HlcClrTextAreaModule,
    TextComponent,
    HlcClrTextModule,
    ToggleComponent,
    HlcClrToggleModule,
    PhoneComponent,
    HlcClrPhoneModule,
    HlcClrPasswordModule,
    PasswordComponent
} from '@ng-holistic/clr-controls';

/**
 * Predefined set of controls based on clarity design system which could be possible generated on form layout.
 */
export const clrFieldsLayoutMap = {
    TextField: TextComponent,
    TextAreaField: TextAreaComponent,
    SelectField: SelectComponent,
    DateField: DateComponent,
    ToggleField: ToggleComponent,
    OptionsField: OptionsComponent,
    CheckboxesField: CheckboxesComponent,
    DateTimeField: DateTimeComponent,
    DateRangeField: DateRangeComponent,
    MaskField: MaskComponent,
    PhoneField: PhoneComponent,
    PasswordField: PasswordComponent
};

export const clrFieldsLayoutComponents = [
    TextComponent,
    TextAreaComponent,
    SelectComponent,
    DateComponent,
    ToggleComponent,
    OptionsComponent,
    CheckboxesComponent,
    DateTimeComponent,
    DateRangeComponent,
    MaskComponent,
    PhoneComponent,
    PasswordComponent
];

export const clrFieldsLayoutModules = [
    HlcClrTextModule,
    HlcClrTextAreaModule,
    HlcClrSelectModule,
    HlcClrDateModule,
    HlcClrToggleModule,
    HlcClrOptionsModule,
    HlcClrCheckboxesModule,
    HlcClrDateTimeModule,
    HlcClrDateRangeModule,
    HlcClrMaskModule,
    HlcClrPhoneModule,
    HlcClrPasswordModule
];
