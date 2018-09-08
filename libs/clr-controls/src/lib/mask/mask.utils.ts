import * as R from 'ramda';

export class TextMask {
    static unmaskNumber = (val: string): number | null => (val ? +val.replace(/\D+/g, '') : null);

    static int = (n: number) => R.repeat(/\d/, n);
}
