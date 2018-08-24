export namespace List {
    export interface Paginator {
        length: number;
        pageSize: number;
        pageIndex: number;
    }

    export interface Pager {
        pageSize: number;
        pageIndex: number;
    }

    export interface SearchParams<T = any> {
        pager: Pager;
        filter?: T | null;
        sort?: Sort;
    }

    export interface Paginator {
        length: number;
        pageSize: number;
        pageIndex: number;
    }

    export interface KeyValue {
        [key: string]: any;
    }

    export interface ItemBase extends KeyValue {
        id: string;
    }

    export interface SearchResult<TItem extends ItemBase = ItemBase> {
        items: TItem[];
        paginator: Paginator | null;
    }

    export interface Sort {
        field: string;
        revers: boolean;
    }

    export interface StateModel<TItem extends List.ItemBase, TFilter extends KeyValue = KeyValue> {
        items: TItem[];
        filter: TFilter | null;
        sort: Sort | null;
        paginator: List.Paginator | null;
    }
}
