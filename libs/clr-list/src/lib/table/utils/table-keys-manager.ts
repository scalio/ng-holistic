import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ElementRef, Injectable, QueryList } from '@angular/core';
import { ClrDatagridRow } from '@clr/angular';
import { HlcHotkeysContainerService } from '@ng-holistic/clr-common';
import * as R from 'ramda';
import { Subject } from 'rxjs';
import { Table } from '../table.types';

@Injectable()
export class HlcTableKeysManagerService {
    // rows select
    private _activeRowKeyManager: ActiveDescendantKeyManager<Table.Row>;
    private readonly _activeRowChanged = new Subject<Table.Row | undefined>();
    private readonly _scrollIntoView = new Subject<Table.Row>();
    private _datagridRows: QueryList<ClrDatagridRow>;
    private readonly _refresh$ = new Subject();
    private readonly _action$ = new Subject<'primary' | 'secondary'>();

    // pages
    private _pagesKeyManager: ActiveDescendantKeyManager<any>;
    private _activePageChanged = new Subject<number>();

    constructor(hotkeysContainer: HlcHotkeysContainerService) {
        hotkeysContainer.addKeys('down', () => {
            this._activeRowKeyManager.setNextItemActive();
            if (this._activeRowKeyManager.activeItem) {
                this._activeRowKeyManager.activeItem.scrollIntoView();
            }
        });

        hotkeysContainer.addKeys('up', () => {
            this._activeRowKeyManager.setPreviousItemActive();
            if (this._activeRowKeyManager.activeItem) {
                this._activeRowKeyManager.activeItem.scrollIntoView();
            }
        });

        hotkeysContainer.addKeys('left', () => {
            this._pagesKeyManager.setPreviousItemActive();
        });

        hotkeysContainer.addKeys('right', () => {
            this._pagesKeyManager.setNextItemActive();
        });

        hotkeysContainer.addKeys('ctrl+r', () => {
            this._refresh$.next();
        });

        hotkeysContainer.addKeys('enter', () => {
            this._action$.next('primary');
        });

        hotkeysContainer.addKeys('space', () => {
            this._action$.next('secondary');
        });
    }

    setDatagridRows(datagridRows: QueryList<ClrDatagridRow>) {
        this._datagridRows = datagridRows;
    }

    get activeRowChanged() {
        return this._activeRowChanged.asObservable();
    }

    get activePageChanged() {
        return this._activePageChanged.asObservable();
    }

    get refresh() {
        return this._refresh$.asObservable();
    }

    get action() {
        return this._action$.asObservable();
    }

    get scrollIntoView() {
        return this._scrollIntoView.asObservable();
    }

    onRowsChanged(rows: Table.Row[]) {
        if (!rows) {
            return;
        }
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

        const activeRow = this._activeRowKeyManager && this._activeRowKeyManager.activeItem;
        this._activeRowKeyManager = new ActiveDescendantKeyManager(highlightable)
            .withVerticalOrientation(true)
            .withWrap(true);
        const activeIndex = activeRow ? rows.findIndex(row => row.id === activeRow.id) : -1;
        this._activeRowKeyManager.setActiveItem(activeIndex);
        this._activeRowChanged.next(rows[activeIndex]);
    }

    onSetActive(index: number) {
        this._activeRowKeyManager.setActiveItem(index);
    }

    // page
    onPagesChanged(pagesCount: number, activePage: number) {
        const highlightable = R.repeat(null, pagesCount).map((_, index) => ({
            index: index + 1,
            setActiveStyles: () => {
                this._activePageChanged.next(index + 1);
            },
            setInactiveStyles: () => {}
        }));

        this._pagesKeyManager = new ActiveDescendantKeyManager(highlightable).withWrap();
        this._pagesKeyManager.setActiveItem(activePage - 1);
        this._activeRowKeyManager.setActiveItem(0);
    }
}
