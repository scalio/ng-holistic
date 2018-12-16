import { ClrDatagridStateInterface } from '@clr/angular';
import { TableData } from './table.types';
import { identity } from 'ramda';
import { InjectionToken } from '@angular/core';

export interface TableDataProviderConfig {
    mapState(state: ClrDatagridStateInterface): any;
    mapResult(result: any): TableData.Result;
}

export const defaultTableDataProviderConfig: TableDataProviderConfig = {
    mapState: identity,
    mapResult: identity
};

export const HLC_CLR_TABLE_DATA_PROVIDER_CONFIG = new InjectionToken<TableDataProviderConfig>(
    'HLC_CLR_TABLE_DATA_PROVIDER_CONFIG'
);
