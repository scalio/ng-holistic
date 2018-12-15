import * as R from 'ramda';
import { Table } from './table.types';

export const mapRow = (config: Table.TableConfig) => (item: any): Table.Row => ({
    id: item['id'],
    cells: R.pipe(R.map((col: Table.Column) => ({ column: col, value: item[col.id] })))(config.cols)
});

export const mapRows = (config: Table.TableConfig, items: any[]) => R.pipe(R.map(mapRow(config)))(items);
