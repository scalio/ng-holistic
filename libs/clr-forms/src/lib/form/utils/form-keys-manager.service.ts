import { Injectable } from '@angular/core';
import { HlcHotkeysContainerService } from '@ng-holistic/clr-common';
import { Subject } from 'rxjs';

@Injectable()
export class HlcFormKeysManagerService {
    readonly save$ = new Subject();
    readonly cancel$ = new Subject();

    constructor(hotkeysContainer: HlcHotkeysContainerService) {
        console.log('HlcFormKeysManagerService');
        hotkeysContainer.addKeys('ctrl+enter', () => {
            this.save$.next();
        });
        hotkeysContainer.addKeys('ctrl+z', () => {
            this.cancel$.next();
        });
    }
}
