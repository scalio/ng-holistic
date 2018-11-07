import { FormFields } from '@ng-holistic/forms';
import * as R from 'ramda';
import { ClrFormLayouts } from '../models/form-layout.types';

export const flatItems = (group: ClrFormLayouts.ClrFormLayout): FormFields.FormField[] => {
    if (group.kind === 'fields') {
        return group['fields'];
    }

    return R.pipe(
        R.prop('$content'),
        R.chain(flatItems),
        R.flatten
    )(group);
};

export const flatGroup = (group: ClrFormLayouts.ClrFormLayout): FormFields.FormField[] => flatItems(group);
