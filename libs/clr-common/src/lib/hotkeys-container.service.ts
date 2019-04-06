import { Injectable } from '@angular/core';
import { HlcHotKeysService } from '@ng-holistic/clr-common';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';

export interface HotkeyAction {
    type: string;
    payload: any;
}

@Injectable()
export class HlcHotkeysContainerService {
    private readonly stop$ = new Subject();
    readonly useKeys$ = new BehaviorSubject(false);
    readonly focus$ = new BehaviorSubject(false);
    readonly loading$ = new BehaviorSubject(false);
    readonly destroy$ = new Subject();
    private _isListenKeyEvents = false;
    private readonly litenedKeys: { keys: string; handler: () => void }[] = [];

    constructor(private readonly hotkeys: HlcHotKeysService) {
        combineLatest(this.useKeys$, this.focus$)
            .pipe(takeUntil(this.destroy$))
            .subscribe(([useKeys, focus]) => {
                if (useKeys && focus) {
                    this.startListenKeyEvents();
                } else {
                    this.stopListenKeyEvents();
                }
            });
    }

    addKeys(keys: string, handler: () => void) {
        this.litenedKeys.push({ keys, handler });
    }

    private startListenKeyEvents() {
        if (this._isListenKeyEvents) {
            return;
        }

        this.litenedKeys.forEach(({ keys, handler }) => {
            this.getKeys(keys).subscribe(() => {
                handler();
            });
        });

        this._isListenKeyEvents = true;
    }

    private stopListenKeyEvents() {
        if (!this._isListenKeyEvents) {
            return;
        }

        this.stop$.next();
        this._isListenKeyEvents = false;
    }

    getKeys(keys: string) {
        return this.hotkeys.add(keys).pipe(
            takeUntil(this.stop$),
            takeUntil(this.destroy$),
            withLatestFrom(this.loading$),
            filter(([_, loading]) => !loading),
            map(([key]) => key)
        );
    }
}
