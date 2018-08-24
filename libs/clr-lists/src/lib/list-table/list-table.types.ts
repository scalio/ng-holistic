import { Cell } from './list-table.utils';

export interface TextColumnMeta {
    format: 'date';
}

export type ColumnType = 'Text' | 'Custom' | 'Check' | 'Image' | 'Html';
export type ColumnTypeMeta = TextColumnMeta;

export interface Column {
    id: string;
    title: string;
    isSortable?: boolean;
    type: ColumnType;
    meta?: ColumnTypeMeta;
}

export interface RowDetails {
    type: 'overall' | 'replaceRow';
    // getting detail items from row
    getDetails?(row: any): any[];
}

export interface TableConfig {
    cols: Column[];
    selector?: 'multi';
    rowDetails?: RowDetails;
}

export interface CellClickEvent {
    cell: Cell;
    row: any;
}
