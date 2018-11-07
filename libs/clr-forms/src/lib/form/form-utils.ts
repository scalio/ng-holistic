import { FormFields } from '@ng-holistic/forms';
import * as R from 'ramda';
import { FormGroup } from '../models';

export const flatItems = (group: FormGroup.FormGroup): FormFields.FormField[] => {
    if (group.kind === 'fields') {
        return group.fields;
    }
    /*
    if (group.kind === 'tabs') {
        return (group as any)['tabs'].map(flatItems);
    }
    */

    return R.pipe(
        R.prop('$content'),
        R.chain(flatItems),
        R.flatten
    )(group);
};

export const flatGroup = (group: FormGroup.FormGroup): FormFields.FormField[] => flatItems(group);
