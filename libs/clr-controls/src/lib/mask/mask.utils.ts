import * as R from 'ramda';

export class TextMask {
    static unmaskStrNumber = (val: string): string | null => (val ? val.replace(/\D|\.+/g, '') : null);
    static unmaskNumber = (val: string): number | null => {
        const str = TextMask.unmaskStrNumber(val);
        return str ? +str : null;
    };

    static int = (n: number) => R.repeat(/\d/, n);
    static float = (n: number) => R.repeat(/\d|\./, n);
    static hexColor = () => ['#', ...R.repeat(/\d|a|b|c|d|e|f|A|B|C|D|E|F/, 6)];
    static phone = () => ({
        mask: ['+', /\d/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        keepCharPositions: true,
        placeholderChar: '\u2000'
    });
}
