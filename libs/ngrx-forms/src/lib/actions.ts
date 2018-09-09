import { Action } from '@ngrx/store';

export namespace SubFormActions {
    // Create

    export class Create implements Action {
        static Type = '[SubForm] Create';

        public type = Create.Type;

        constructor(public data: any) {}
    }

    export class CreateSuccess implements Action {
        static Type = '[SubForm] CreateSuccess';

        public type = CreateSuccess.Type;

        constructor(public data: any) {}
    }

    export class CreateError implements Action {
        static Type = '[SubForm] CreateError';

        public type = CreateError.Type;

        constructor(public err: any) {}
    }

    // Read

    export class Read implements Action {
        static Type = '[SubForm] Read';

        public type = Read.Type;

        constructor(public id: any) {}
    }

    export class ReadSuccess implements Action {
        static Type = '[SubForm] ReadSuccess';

        public type = ReadSuccess.Type;

        constructor(public data: any) {}
    }

    export class ReadError implements Action {
        static Type = '[SubForm] ReadError';

        public type = ReadError.Type;

        constructor(public err: any) {}
    }

    // Update

    export class Update implements Action {
        static Type = '[SubForm] Update';

        public type = Update.Type;

        constructor(public data: any) {}
    }

    export class UpdateSuccess implements Action {
        static Type = '[SubForm] UpdateSuccess';

        public type = UpdateSuccess.Type;

        constructor(public data: any) {}
    }

    export class UpdateError implements Action {
        static Type = '[SubForm] UpdateError';

        public type = UpdateError.Type;

        constructor(public err: any) {}
    }

    // Delete

    export class Delete implements Action {
        static Type = '[SubForm] Delete';

        public type = Delete.Type;

        constructor(public data: any) {}
    }

    export class DeleteSuccess implements Action {
        static Type = '[SubForm] DeleteSuccess';

        public type = DeleteSuccess.Type;

        constructor(public data: any) {}
    }

    export class DeleteError implements Action {
        static Type = '[SubForm] DeleteError';

        public type = DeleteError.Type;

        constructor(public err: any) {}
    }

    export type SubFormAction =
        | Create
        | CreateSuccess
        | CreateError
        | Read
        | ReadSuccess
        | ReadError
        | Update
        | UpdateSuccess
        | UpdateError
        | Delete
        | DeleteSuccess
        | DeleteError;
}
