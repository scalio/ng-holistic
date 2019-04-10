import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HlcHotkeysContainerService } from '../../../hotkeys/hotkeys-container.service';

@Injectable()
export class HlcModalKeysManagerService {
    readonly ok$ = new Subject();
    readonly cancel$ = new Subject();

    constructor(hotkeysContainer: HlcHotkeysContainerService) {
        hotkeysContainer.addKeys('ctrl+enter', () => {
            this.ok$.next();
        });
        hotkeysContainer.addKeys('ctrl+z', () => {
            this.cancel$.next();
        });
        hotkeysContainer.addKeys('escape', () => {
            this.cancel$.next();
        });
    }
}
