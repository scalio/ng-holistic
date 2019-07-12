import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Observable, Subject } from 'rxjs';

export namespace Table {

    export interface FormatResult { 
        val?: string | null; 
        cls?: string | null; 
    } 
    export interface ColumnBase {
        id: string;
        title: string;
        /** Sort column id or true if sort id = column id */
        sort?: string | boolean;
    }

    export type FormatFun = (val: any, row: Row) => string | FormatResult | undefined | null;

    export interface Column extends ColumnBase {
        cls?: string | FormatFun;
        /** Obsolete ! Allow wrap whitespace when cell generated / off by default */
        whitespaceWrap?: boolean;
        /** Obsolete ! Align content / start by default */
        alignContent?: 'start' | 'center' | 'end';
        /**
         * Format column value
         * Returns formatted to display represenation value or ColumnFormat
         * If it is a string it will get corresponding formatter from HLC_CLR_TABLE_CELL_FORMAT_MAP provider
         */
        format?: FormatFun | string;
    }

    export interface CustomColumn extends ColumnBase {
        customCell: true;
    }

    export interface RowBase {
        id: any;
    }

    export interface Row extends RowBase {
        [key: string]: any;
    }

    // For each column defined on the table you could provide aggregation function.
    // This interface is the Map object `columnId : aggregationFunction for the column`
    // The aggregation function takes as a first param all values from all
    // visible rows for this column and as second additional rows all visible rows.
    export interface AggregateRow {
        [colId: string]: (vals: any[], rows?: Row[]) => any;
    }

    export interface RowAction {
        id: any;
        title: string;
    }

    // TODO : Rename RowEvent
    export interface CellClickEvent {
        cell?: ColumnBase;
        row: Row;
        type: 'primary' | 'secondary';
    }

    export interface RowActionEvent {
        action: RowAction;
        row: Row;
    }

    export type DropEvent = CdkDragDrop<Table.Row>;

    export interface SortColumn {
        name: string;
        direction: 'asc' | 'desc';
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

export interface TableDetails {
    /*
    Subset of root cols (by id), if cols not in the subset they will be ignored
    */
    cols?: (Table.Column | Table.CustomColumn | Table.MapColumns.Column)[];
    rows: (parentRow: Table.Row) => any[];
}

export interface TableDescription<TMapColumns = Table.MapColumns.Column> {
    cols: (Table.Column | Table.CustomColumn | TMapColumns)[];
    rowActions?: Table.RowAction[] | ((row: Table.Row) => Table.RowAction[]);
    details?: TableDetails;
    sort?: string | Table.SortColumn;
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

    export interface Sort {
        by: string;
        reverse: boolean;
    }

    export interface Result {
        rows: Table.Row[];
        paginator?: Paginator;
        sort?: Sort;
        filters?: { property: string; value: any }[];
    }
}
