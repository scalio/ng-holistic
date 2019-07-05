import { Component, ChangeDetectionStrategy } from '@angular/core';

const custom_cell = `
<hlc-clr-table [table]="table" [dataProvider]="dataProvider">
    <ng-template hlcClrCustomCell="custom" let-val let-row="row"> {{ val }} </ng-template>
</hlc-clr-table>
`;

const row_detail = `
<hlc-clr-table [table]="table" [dataProvider]="dataProvider">
    <ng-template hlcClrRowDetail let-detail>
        <h3>{{ detail.title }} : {{ detail.amount }}</h3>
    </ng-template>
</hlc-clr-table>
`;

const table_aggregate_row = `
interface AggregateRow {
    [colId: string]: (vals: any[], rows?: Row[]) => any;
}
`;


@Component({
    selector: 'hlc-clr-sandbox-table-page',
    templateUrl: './table-page.component.html',
    styleUrls: ['./table-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePageComponent {
    row_detail = row_detail;
    custom_cell = custom_cell;
    table_aggregate_row = table_aggregate_row;
}
