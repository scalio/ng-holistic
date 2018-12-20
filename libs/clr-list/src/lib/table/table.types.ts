import { Observable, Subject } from 'rxjs';

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
        customCell: true;
    }

    export interface RowBase {
        id: string;
    }

    export interface Row extends RowBase {
        [key: string]: any;
    }
}

export namespace Table.MapColumns {
    export interface MapColumn<P = any> extends ColumnBase {
        kind: string;
        props: P;
    }

    export type CellPropFun<T> = (val: any, row: any) => T;

    export type CellProp<T> = CellPropFun<T> | T;

    export interface LinkCellProps {
        title: CellProp<string>;
        link?: CellProp<any>;
        clicked?: Subject<any>;
    }

    export interface LinkColumn extends MapColumn<LinkCellProps> {
        kind: 'LinkColumn';
    }

    export interface ImgCellProps {
        src: CellProp<string>;
        width?: CellProp<string>;
        height?: CellProp<string>;
    }

    export interface ImgColumn extends MapColumn<ImgCellProps> {
        kind: 'ImgColumn';
    }

    export type Column = LinkColumn | ImgColumn;
}

export interface TableDescription {
    cols: (Table.Column | Table.CustomColumn | Table.MapColumns.Column)[];
}

export namespace Table.Data {
    /**
     * We load data in any format, but then they must be converted to the table format via config
     */
    export interface DataProvider<TState = any, TResult = any> {
        load(state: TState): Observable<TResult>;
    }

    export interface Paginator {
        pageIndex: number;
        pageSize: number;
        length: number;
    }

    export interface Result {
        rows: Table.Row[];
        paginator?: Paginator;
    }
}
