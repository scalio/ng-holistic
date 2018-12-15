import * as R from 'ramda';
import { Table } from './table.types';

export const mapRow = (config: Table.TableDescription) => (item: any): Table.Row => ({
    id: item['id'],
    cells: R.pipe(R.map((col: Table.Column) => ({ column: col, value: item[col.id] })))(config.cols)
});

export const mapRows = (config: Table.TableDescription, items: any[]) => R.pipe(R.map(mapRow(config)))(items);
