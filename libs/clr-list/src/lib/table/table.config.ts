import { ClrDatagridStateInterface } from '@clr/angular';
import { Table } from './table.types';
import { identity } from 'ramda';
import { InjectionToken, Type } from '@angular/core';

// DataProvider

export interface TableDataProviderConfig {
    mapState(state: ClrDatagridStateInterface): any;
    mapResult(result: any): Table.Data.Result;
}

export const defaultTableDataProviderConfig: TableDataProviderConfig = {
    mapState: identity,
    mapResult: identity
};

export const HLC_CLR_TABLE_DATA_PROVIDER_CONFIG = new InjectionToken<TableDataProviderConfig>(
    'HLC_CLR_TABLE_DATA_PROVIDER_CONFIG'
);

// Cell

export interface TableCellMap {
    [key: string]: Type<any>;
}

export const HLC_CLR_TABLE_CELL_MAP = new InjectionToken<TableCellMap>('HLC_CLR_TABLE_CELL_MAP');


export interface PaginatorItems {
    // defaultItemKey: any;
    /**
     * Paginator items in format defined by `controls DictMapperService`
     */
    items: any[];
}

export const HLC_CLR_TABLE_PAGINATOR_ITEMS = new InjectionToken<PaginatorItems>('HLC_CLR_TABLE_PAGINATOR_ITEMS');
