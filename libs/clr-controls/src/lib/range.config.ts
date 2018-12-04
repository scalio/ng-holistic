import { Injectable } from '@angular/core';

export interface RangeMapper {
    getRange(item: any): [any, any];
    setRange(val: [any, any]): any;
}

/**
 * Converts domain `range` values to component ones.
 * For example domain range type could be in following formats `[x,y]` or `{from: x, to: y}}
 * We need universal way to convert these values to / from - component / domain
 * By default used `{from, to}` format
 */
@Injectable({ providedIn: 'root' })
export class RangeMapperService implements RangeMapper {
    getRange(item: any): [any, any] {
        return [item['from'], item['to']];
    }

    setRange(val: [any, any]): any {
        return { from: val[0], to: val[1] };
    }
}
