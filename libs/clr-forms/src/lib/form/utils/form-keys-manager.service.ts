import { Injectable } from '@angular/core';
import { HlcHotkeysContainerService } from '@ng-holistic/clr-common';
import { Subject } from 'rxjs';

@Injectable()
export class HlcFormKeysManagerService {
    readonly save$ = new Subject();
    readonly cancel$ = new Subject();
    readonly nextTab$ = new Subject();
    readonly pervTab$ = new Subject();

    constructor(hotkeysContainer: HlcHotkeysContainerService) {
        hotkeysContainer.addKeys('ctrl+enter', () => {
            this.save$.next();
        });
        hotkeysContainer.addKeys('ctrl+q', () => {
            this.cancel$.next();
        });
        hotkeysContainer.addKeys('ctrl+right', () => {
            this.nextTab$.next();
        });
        hotkeysContainer.addKeys('ctrl+left', () => {
            this.pervTab$.next();
        });
    }
}
