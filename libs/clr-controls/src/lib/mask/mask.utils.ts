import * as R from 'ramda';

export class TextMask {
    static unmaskStrNumber(val: string): string | null {
        const regex = /[\D|[^.]]+/g;
        return val ? val.replace(regex, '') : null;
    }

    static unmaskNumber(val: string): number | null {
        const str = TextMask.unmaskStrNumber(val);
        return str ? +str : null;
    }

    static int(n: number) {
        return R.repeat('9', n).join('');
    }

    static float(n: number, i: number) {
        return R.repeat('9', n).join('') + '.' + R.repeat('0', i).join('');
    }

    /*
    static hexColor() {
        const regex = /\d|a|b|c|d|e|f|A|B|C|D|E|F/;
        return ['#', ...R.repeat(regex, 6)];
    }
    */


    static phone() {
        return '+0 (000) 000-0000';
    }

}
