import { Pipe, PipeTransform } from '@angular/core';
import { sort } from 'ramda';

@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform {
    transform(items: any[], fn: ((a: any, b: any) => number)) {
        return fn && items ? sort(fn, items) : items;
    }
}
