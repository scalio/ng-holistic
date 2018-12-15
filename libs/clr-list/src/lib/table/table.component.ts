import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Table } from './table.types';

@Component({
    selector: 'hlc-clr-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
    /**
     * Redux like integration with external store for rows
     */
    @Input() rows: Table.Row[];

    @Input() config: Table.TableConfig | undefined;

    onRefresh(state: ClrDatagridStateInterface) {
        console.log('111', state);

        // TODO : map refresh params via config
    }

    isRowActive(_: Table.RowBase) {
        return false;
    }

    getCellClass(cell: Table.Column, row: Table.Row) {
        if (cell.format) {
            const fmt = cell.format(row[cell.id], row);
            if (!fmt) {
                return '';
            }
            return typeof fmt === 'string' ? undefined : fmt.cls;
        } else {
            return undefined;
        }
    }

    getCellDisplayValue(cell: Table.Column, row: Table.Row) {
        if (cell.format) {
            const fmt = cell.format(row[cell.id], row);
            if (!fmt) {
                return '';
            }
            return typeof fmt === 'string' ? fmt : fmt.val || '';
        } else {
            return row[cell.id];
        }
    }

    // trackBy

    trackByCol(_: any, col: Table.ColumnBase) {
        return col.id;
    }

    trackByRow(_: any, row: Table.RowBase) {
        return row.id;
    }
}
