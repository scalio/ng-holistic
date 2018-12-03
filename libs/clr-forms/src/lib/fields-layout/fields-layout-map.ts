import {
    CheckboxesComponent,
    DateComponent,
    OptionsComponent,
    SelectComponent,
    TextAreaComponent,
    TextComponent,
    ToggleComponent,
    DateTimeComponent
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
    DateTimeField: DateTimeComponent
};
