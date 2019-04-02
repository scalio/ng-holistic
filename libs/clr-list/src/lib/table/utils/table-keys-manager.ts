import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ElementRef, Injectable, QueryList } from '@angular/core';
import { ClrDatagridRow } from '@clr/angular';
import { HlcHotKeysService } from '@ng-holistic/clr-common';
import { Subject } from 'rxjs';
import { Table } from '../table.types';

@Injectable()
export class HlcTableKeysManagerService {
    private _keyManager: ActiveDescendantKeyManager<Table.Row>;
    private readonly _activeRowChanged = new Subject<Table.Row | undefined>();
    private readonly _scrollIntoView = new Subject<Table.Row>();
    private _datagridRows: QueryList<ClrDatagridRow>;

    constructor(private readonly hotkeys: HlcHotKeysService) {}

    setDatagridRows(datagridRows: QueryList<ClrDatagridRow>) {
        this._datagridRows = datagridRows;
    }

    get activeRowChanged() {
        return this._activeRowChanged.asObservable();
    }

    get scrollIntoView() {
        return this._scrollIntoView.asObservable();
    }

    onRowsChanged(rows: Table.Row[]) {
        console.log('onRowsChanged', rows);
        const highlightable = rows.map(row => ({
            ...row,
            setActiveStyles: () => {
                this._activeRowChanged.next(row);
            },
            setInactiveStyles: () => {
                this._activeRowChanged.next(undefined);
            },
            scrollIntoView: () => {
                const index = rows.indexOf(row);
                const datagridRow = this._datagridRows.find((_, i) => i === index);
                if (datagridRow) {
                    const el = datagridRow['el'] as ElementRef;
                    if (el) {
                        el.nativeElement.scrollIntoView(false);
                    }
                }
            }
        }));

        const activeRow = this._keyManager && this._keyManager.activeItem;
        this._keyManager = new ActiveDescendantKeyManager(highlightable).withVerticalOrientation(true).withWrap(true);
        const activeIndex = activeRow ? rows.findIndex(row => row.id === activeRow.id) : -1;
        this._keyManager.setActiveItem(activeIndex);
        this._activeRowChanged.next(rows[activeIndex]);
    }

    onFocus() {
        if (!this._keyManager.activeItem) {
            this._keyManager.setFirstItemActive();
        }
        this.hotkeys.add('down').subscribe(() => {
            this._keyManager.setNextItemActive();
            if (this._keyManager.activeItem) {
                this._keyManager.activeItem.scrollIntoView();
            }
        });

        this.hotkeys.add('up').subscribe(() => {
            this._keyManager.setPreviousItemActive();
            if (this._keyManager.activeItem) {
                this._keyManager.activeItem.scrollIntoView();
            }
        });
    }

    onSetActive(index: number) {
        this._keyManager.setActiveItem(index);
    }
}
