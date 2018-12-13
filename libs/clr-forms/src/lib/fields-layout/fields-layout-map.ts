import {
    CheckboxesComponent,
    CheckboxesModule,
    DateComponent,
    DateModule,
    DateRangeComponent,
    DateRangeModule,
    DateTimeComponent,
    DateTimeModule,
    MaskComponent,
    MaskModule,
    OptionsComponent,
    OptionsModule,
    SelectComponent,
    SelectModule,
    TextAreaComponent,
    TextAreaModule,
    TextComponent,
    TextModule,
    ToggleComponent,
    ToggleModule,
    PhoneComponent,
    PhoneModule
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
    PhoneField: PhoneComponent
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
    PhoneComponent
];

export const clrFieldsLayoutModules = [
    TextModule,
    TextAreaModule,
    SelectModule,
    DateModule,
    ToggleModule,
    OptionsModule,
    CheckboxesModule,
    DateTimeModule,
    DateRangeModule,
    MaskModule,
    PhoneModule
];
