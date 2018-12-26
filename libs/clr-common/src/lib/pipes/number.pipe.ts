import { formatNumber } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'number'
})
export class NumberPipe implements PipeTransform {
    constructor(@Inject(LOCALE_ID) private readonly localeId: string) {}

    transform(val: number | undefined) {
        return val && formatNumber(val, this.localeId);
    }
}
