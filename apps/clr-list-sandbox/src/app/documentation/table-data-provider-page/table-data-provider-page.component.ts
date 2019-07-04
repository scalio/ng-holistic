import { Component, ChangeDetectionStrategy } from '@angular/core';

const load_signature = `
export interface DataProvider<TState = any, TResult = any> {
    load(state: TState): Observable<TResult>;
}
`;

@Component({
    selector: 'hlc-clr-sandbox-table-data-provider-page',
    templateUrl: './table-data-provider-page.component.html',
    styleUrls: ['./table-data-provider-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDataProviderPageComponent {
    load_signature = load_signature;
}
