import { Pipe, PipeTransform } from '@angular/core';

export const splitPhoneParts = (tel: string): [string, string, string] | null => {
    if (!tel) {
        return null;
    }
    const value = tel
        .toString()
        .trim()
        .replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
        return null;
    }

    let country, city, number;

    switch (value.length) {
        case 10: // +1PPP####### -> C (PPP) ###-####
            country = 1;
            city = value.slice(0, 3);
            number = value.slice(3);
            break;

        case 11: // +CPPP####### -> CCC (PP) ###-####
            country = value[0];
            city = value.slice(1, 4);
            number = value.slice(4);
            break;

        case 12: // +CCCPP####### -> CCC (PP) ###-####
            country = value.slice(0, 3);
            city = value.slice(3, 5);
            number = value.slice(5);
            break;

        default:
            return null;
    }

    if (country === 1) {
        country = '';
    }

    number = number.slice(0, 3) + '-' + number.slice(3);

    return [country.toString().trim(), city.trim(), number.trim()];
};

export const formatPhone = (tel: string) => {
    const parts = splitPhoneParts(tel);
    if (!parts) {
        // catn format
        return tel;
    }
    return ('+' + parts[0] + ' (' + parts[1] + ') ' + parts[2]).trim();
};

@Pipe({
    name: 'phone'
})
export class PhonePipe implements PipeTransform {
    transform(tel: string) {
        return formatPhone(tel);
    }
}
