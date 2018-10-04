import { IFormGroup, FormField } from '@ng-holistic/forms';

export namespace FormGroup {
    export interface FieldsGroup extends IFormGroup<'fields'> {
        fields: FormField.FormField2[];
    }

    // tslint:disable-next-line:no-shadowed-variable
    export type FormGroup = FieldsGroup;
}
