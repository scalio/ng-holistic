import { FormField } from '@ng-holistic/forms';
import * as R from 'ramda';
import { FormGroup } from '../models';

export const flatItems = (group: FormGroup.FormGroup): FormField.FormField2[] => {
    if (group.kind === 'fields') {
        return group.fields;
    }
    return R.pipe(
        R.prop('$content'),
        R.chain(flatItems),
        R.flatten
    )(group);
};

export const flatGroup = (group: FormGroup.FormGroup): FormField.FormField2[] => flatItems(group);
