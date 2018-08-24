import { Action } from '@ngrx/store';
import { List } from '@ng-holistic/lists';

export namespace SubListActions {
    export class Load implements Action {
        static Type = '[SubList] Load';

        public type = Load.Type;

        constructor(public data: List.SearchParams) {}
    }

    export class LoadSuccess implements Action {
        static Type = '[SubList] LoadSuccess';

        public type = LoadSuccess.Type;

        constructor(public data: List.SearchResult) {}
    }

    export class LoadError implements Action {
        static Type = '[SubList] LoadError';

        public type = LoadError.Type;

        constructor(public err: any) {}
    }

    export type SubListAction = Load | LoadSuccess | LoadError;
}
