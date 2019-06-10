import { FormControl } from '@angular/forms';
import { isNil } from 'ramda';
import { MonthYearSelectValue } from './month-year-select.component';

export const monthYearRequiredValidator = (c: FormControl) => {
    const val = c.value as MonthYearSelectValue;
    if (!val || isNil(val.month) || isNil(val.year)) {
        return { required: true };
    } else {
        return null;
    }
};
