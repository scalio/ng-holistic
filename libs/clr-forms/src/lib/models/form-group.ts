import { IFormGroup, FormFields } from '@ng-holistic/forms';

export namespace FormGroup {
    export interface FieldsGroup extends IFormGroup<'fields'> {
        fields: FormFields.FormField[];
    }


    // tslint:disable-next-line:no-shadowed-variable
    export type FormGroup = FieldsGroup;
}
