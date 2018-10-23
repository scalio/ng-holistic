import { FormField } from '@ng-holistic/forms';
import * as R from 'ramda';
import { FormGroup } from '../models';

export const flatItems = (group: FormGroup.FormGroup): FormField.FormField2[] => {
    if (group.kind === 'fields') {
        return group.fields as any as FormField.FormField2[];
    }
    return R.pipe(
        R.pluck('$content'),
        R.chain(flatItems) as any,
        R.flatten
    )(group) as any;
};

export const flatGroup = (group: FormGroup.FormGroup): FormField.FormField2[] => flatItems(group);
