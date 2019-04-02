import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
import { HlcHotKeysService } from '@ng-holistic/clr-common';
import { Subject } from 'rxjs';
import { Table } from '../table.types';

@Injectable()
export class HlcTableKeysManagerService {
    private _keyManager: ActiveDescendantKeyManager<Table.Row>;
    private readonly _activeRowChanged = new Subject<Table.Row | undefined>();
    private readonly _scrollIntoView = new Subject<Table.Row>();

    constructor(private readonly hotkeys: HlcHotKeysService) {}

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
                this._scrollIntoView.next(row);
            }
        }));
        this._keyManager = new ActiveDescendantKeyManager(highlightable).withVerticalOrientation(true).withWrap(true);
        this._keyManager.setActiveItem(-1);
        // this._activeRowChanged.next(undefined);
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
