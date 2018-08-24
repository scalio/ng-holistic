import { TableConfig, Column } from './list-table.types';
import { ClrDatagridStateInterface } from '@clr/angular';
import { List } from '@ng-holistic/lists';
import * as R from 'ramda';

// TODO: move to constants

export interface Cell {
    value: string;
    column: Column;
}

export interface Row {
    id: string;
    cells: Cell[];
}

export const mapRow = (config: TableConfig) => (item: any): Row => ({
    id: item['id'],
    cells: R.pipe(R.map((col: Column) => ({ column: col, value: item[col.id] })))(config.cols) as any
});

export const mapRows = (config: TableConfig, items: any[]) => R.pipe(R.map(mapRow(config)))(items);

const DEFAULT_PAGE_SIZE = 25;

export const mapRefreshParams = (prms: ClrDatagridStateInterface): List.SearchParams => ({
    pager: {
        pageIndex: prms.page ? (prms.page.from || 0) / (prms.page.size || DEFAULT_PAGE_SIZE) + 1 : 1,
        pageSize: R.pathOr<any>(DEFAULT_PAGE_SIZE, ['page', 'size'], prms)
    }
    // sort: prms.sort ? { field: prms.sort.by as string, direction: prms.sort.reverse ? 'desc' : 'asc' } : undefined
});
