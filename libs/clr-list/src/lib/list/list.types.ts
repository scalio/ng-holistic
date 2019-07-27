import { Table } from '../table/table.types';
import { ClrFormFields } from '@ng-holistic/clr-forms';

export namespace List {
    export interface Definition<TMapColumns = Table.MapColumns.Column> extends Table.Definition<TMapColumns> {
        filters?: ClrFormFields.FormField[];
    }
}
