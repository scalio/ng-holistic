import * as R from 'ramda';

export class TextMask {
    static unmaskStrNumber(val: string): string | null {
        const regex = /\D|\.+/g;
        return val ? val.replace(regex, '') : null;
    }

    static unmaskNumber(val: string): number | null {
        const str = TextMask.unmaskStrNumber(val);
        return str ? +str : null;
    }

    static int(n: number) {
        const regex = /\d/;
        return R.repeat(regex, n);
    }

    static float(n: number) {
        const regex = /\d|\./;
        R.repeat(regex, n);
    }
    static hexColor() {
        const regex = /\d|a|b|c|d|e|f|A|B|C|D|E|F/;
        return ['#', ...R.repeat(regex, 6)];
    }


    static phone() {
        // PIZDEC NAHOY BLYAT
        // https://github.com/angular/angular/issues/18867
        const d = /\d/;
        const d19 = /[1-9]/;
        return {
            mask: ['+', d, ' ', '(', d19, d, d, ')', ' ', d, d, d, '-', d, d, d, d],
            keepCharPositions: true,
            placeholderChar: '\u2000'
        };
    }

}
