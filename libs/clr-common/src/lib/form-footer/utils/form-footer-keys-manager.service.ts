import { Injectable } from '@angular/core';
import { HlcHotkeysContainerService } from '@ng-holistic/clr-common';
import { Subject } from 'rxjs';

@Injectable()
export class HlcFormFooterKeysManagerService {
    readonly save$ = new Subject();
    readonly cancel$ = new Subject();

    constructor(hotkeysContainer: HlcHotkeysContainerService) {
        hotkeysContainer.addKeys('ctrl+s', () => {
            this.save$.next();
        });
        hotkeysContainer.addKeys('ctrl+esc', () => {
            this.cancel$.next();
        });

    }
}
