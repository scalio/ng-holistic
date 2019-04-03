import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ElementRef, Injectable, QueryList } from '@angular/core';
import { ClrDatagridRow } from '@clr/angular';
import { HlcHotKeysService } from '@ng-holistic/clr-common';
import * as R from 'ramda';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Table } from '../table.types';

@Injectable()
export class HlcTableKeysManagerService {
    // rows select
    private _activeRowKeyManager: ActiveDescendantKeyManager<Table.Row>;
    private readonly _activeRowChanged = new Subject<Table.Row | undefined>();
    private readonly _scrollIntoView = new Subject<Table.Row>();
    private _datagridRows: QueryList<ClrDatagridRow>;
    private _isListenKeyEvents = false;

    private readonly destroy$ = new Subject();
    private readonly stop$ = new Subject();

    loading = false;
    useKeys$ = new BehaviorSubject(false);
    focus$ = new BehaviorSubject(false);

    // pages
    private _pagesKeyManager: ActiveDescendantKeyManager<any>;
    private _activePageChanged = new Subject<number>();

    constructor(private readonly hotkeys: HlcHotKeysService) {
        console.log('333');
        combineLatest(this.useKeys$, this.focus$)
            .pipe(takeUntil(this.destroy$))
            .subscribe(([useKeys, focus]) => {
                console.log('222', useKeys, focus);
                if (useKeys && focus) {
                    this.startListenKeyEvents();
                } else {
                    this.stopListenKeyEvents();
                }
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

    get scrollIntoView() {
        return this._scrollIntoView.asObservable();
    }

    onRowsChanged(rows: Table.Row[]) {
        console.log('onRowsChanged', rows);
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

    destroy() {
        this.destroy$.next();
    }

    private getKeys(keys: string) {
        return this.hotkeys.add(keys).pipe(
            takeUntil(this.stop$),
            filter(() => !this.loading)
        );
    }

    private startListenKeyEvents() {
        if (this._isListenKeyEvents) {
            return;
        }

        this.getKeys('down').subscribe(() => {
            this._activeRowKeyManager.setNextItemActive();
            if (this._activeRowKeyManager.activeItem) {
                this._activeRowKeyManager.activeItem.scrollIntoView();
            }
        });

        this.getKeys('up').subscribe(() => {
            this._activeRowKeyManager.setPreviousItemActive();
            if (this._activeRowKeyManager.activeItem) {
                this._activeRowKeyManager.activeItem.scrollIntoView();
            }
        });

        this.getKeys('left').subscribe(() => {
            this._pagesKeyManager.setPreviousItemActive();
        });

        this.getKeys('right').subscribe(() => {
            this._pagesKeyManager.setNextItemActive();
        });

        this.getKeys('ctrl+r').subscribe(() => {});

        this._isListenKeyEvents = true;
    }

    private stopListenKeyEvents() {
        if (!this._isListenKeyEvents) {
            return;
        }
        this.hotkeys.remove('left');
        this.hotkeys.remove('right');
        this.hotkeys.remove('ctrl+r');
        this.hotkeys.remove('down');
        this.hotkeys.remove('up');
        this.stop$.next();

        this._isListenKeyEvents = false;
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
