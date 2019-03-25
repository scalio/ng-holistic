import * as R from 'ramda';
import { Table } from './table.types';

/**
 * Map response paginator structure to internal data grid page representation
 */
export const mapPageState = (paginator: Table.Data.Paginator): any => {
    const size = paginator.pageSize;
    const from = (paginator.pageIndex - 1) * size;
    let to = from + size - 1;
    to = paginator.length - to >= 0 ? to : paginator.length - 1;
    return { from, to, size };
};

export const omitUndefinedFileds: (<T extends { [key: string]: any | undefined }>(obj: T) => T) = R.pipe(
    R.toPairs,
    R.reject(
        R.pipe(
            R.nth(1),
            R.isNil
        )
    ) as any,
    R.fromPairs
) as any;
