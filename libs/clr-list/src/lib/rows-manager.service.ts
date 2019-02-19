import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Table } from './table/table.types';

@Injectable()
export class RowsManagerService {
    private _addRow$ = new Subject<Table.Row>();
    private _updateRow$ = new Subject<Table.Row>();
    private _removeRow$ = new Subject<Table.Row>();

    addRow(row: Table.Row) {
        this._addRow$.next(row);
    }

    updateRow(row: Table.Row) {
        this._updateRow$.next(row);
    }

    removeRow(row: Table.Row) {
        this._removeRow$.next(row);
    }

    get addRow$() {
        return this._addRow$.asObservable();
    }

    get updateRow$() {
        return this._updateRow$.asObservable();
    }

    get removeRow$() {
        return this._removeRow$.asObservable();
    }
}
