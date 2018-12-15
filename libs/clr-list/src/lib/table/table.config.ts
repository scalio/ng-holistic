import { ClrDatagridStateInterface } from '@clr/angular';
import { TableData } from './table.types';
import { identity } from 'ramda';
import { InjectionToken } from '@angular/core';

export interface TableConfigDataProvider {
    mapState(state: ClrDatagridStateInterface): any;
    mapResult(result: any): TableData.Result;
}

export interface TableConfig {
    dataProvider: TableConfigDataProvider;
}

export const defaultTableConfig: TableConfig = {
    dataProvider: {
        mapState: identity,
        mapResult: identity
    }
};

export const HLC_CLR_TABLE_CONFIG = new InjectionToken<TableConfig>('HLC_CLR_TABLE_CONFIG');
