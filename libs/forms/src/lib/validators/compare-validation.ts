import { AbstractControl } from '@angular/forms';
import { assertNever } from '@ng-holistic/core';
import * as compareAsc from 'date-fns/compareAsc';

export type CompareOperator = 'lt' | 'lte' | 'gt' | 'gte' | 'eq';

export type CompareFun<T> = (val1: T, val2: T) => boolean;

export const compareNumber = (oper: CompareOperator): CompareFun<number> => (val1, val2) => {
    switch (oper) {
        case 'lt':
            return val1 < val2;
        case 'lte':
            return val1 <= val2;
        case 'gt':
            return val1 > val2;
        case 'gte':
            return val1 >= val2;
        case 'eq':
            return val1 === val2;
        default:
            return assertNever(oper);
    }
};

export const compareDateUnit = (unit: 'second' | 'day') => (oper: CompareOperator): CompareFun<string> => (
    val1,
    val2
) => {
    console.log(val1, val2);
    const diff = compareAsc(val1, val2, { unit });
    switch (oper) {
        case 'lt':
            return diff > 0;
        case 'lte':
            return diff >= 0;
        case 'gt':
            return diff < 0;
        case 'gte':
            return diff <= 0;
        case 'eq':
            return diff === 0;
        default:
            return assertNever(oper);
    }
};

export const compareDate = compareDateUnit('day');

export const compareDateTime = compareDateUnit('second');

export function compareValidation(field1: string, compareFun: CompareFun<any>, err: string) {
    return (control: AbstractControl) => {
        if (!control.parent) {
            return null;
        }
        const field1Control = control.parent.get(field1);
        if (!field1Control) {
            return null;
        }

        if (!control.value || !field1Control.value) {
            return null;
        }

        const f = compareFun(control.value, field1Control.value);
        return f ? null : { compare: err };
    };
}
