import { Observable } from 'rxjs';

export namespace Table {
    export interface ColumnFormat {
        val?: string;
        cls?: string;
    }

    export interface ColumnBase {
        id: string;
        title: string;
        /**
         * Sort column id or true if sort id = column id
         */
        sort?: string | boolean;
    }

    export interface Column extends ColumnBase {
        /**
         * Format column value
         * Returns formatted to display represenation value or ColumnFormat
         */
        format?: (val: any, row: any) => string | ColumnFormat;
    }

    export interface CustomColumn extends ColumnBase {
        kind: string;
    }

    export interface TableDescription {
        cols: Column[];
    }

    export interface RowBase {
        id: string;
    }

    export interface Row extends RowBase {
        [key: string]: any;
    }

}

export namespace TableData {

    /**
     * We load data in any format, but then they must be converted to the table format via config
     */
    export interface DataProvider<TState = any, TResult = any> {
        load(state: TState): Observable<TResult>;
    }

    export interface Pagination {
        pageIndex: number;
        pageSize: number;
    }

    export interface Result {
        rows: Table.Row[];
        pagination?: Pagination;
    }

}
