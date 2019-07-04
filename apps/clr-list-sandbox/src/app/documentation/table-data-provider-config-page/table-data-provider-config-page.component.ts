import { Component, ChangeDetectionStrategy } from '@angular/core';

const interface_definition = `
export interface TableDataProviderConfig {
    mapState(state: ClrDatagridStateInterface): any;
    mapResult(result: any): Table.Data.Result;
}`;

const map_state_definition = `
    mapState(state: ClrDatagridStateInterface): any;
`;

const map_result_definition = `
    mapResult(result: any): Table.Data.Result;
`;

const table_data_result_definition = `
export namespace Table.Data {

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
        filters?: { property: string, value: any }[];
    }
}
`;

@Component({
    selector: 'hlc-clr-sandbox-table-data-provider-config-page',
    templateUrl: './table-data-provider-config-page.component.html',
    styleUrls: ['./table-data-provider-config-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDataProviderConfigPageComponent {
    interface_definition = interface_definition;
    map_state_definition = map_state_definition;
    map_result_definition = map_result_definition;
    table_data_result_definition = table_data_result_definition;
}
