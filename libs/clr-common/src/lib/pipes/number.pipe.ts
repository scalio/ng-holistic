import { formatNumber } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { isNil } from 'ramda';

@Pipe({
    name: 'number'
})
export class HlcNumberPipe implements PipeTransform {
    constructor(@Inject(LOCALE_ID) private readonly localeId: string) {}

    transform(val: number | undefined) {
        return isNil(val) ? '' : formatNumber(val, this.localeId);
    }
}
