import { Injectable } from '@angular/core';
import { HlcHotkeysContainerService } from '@ng-holistic/clr-common';
import { Subject } from 'rxjs';

@Injectable()
export class HlcFilterKeysManagerService {
    readonly refresh$ = new Subject();
    readonly reset$ = new Subject();

    constructor(hotkeysContainer: HlcHotkeysContainerService) {
        hotkeysContainer.addKeys('ctrl+r', () => {
            this.refresh$.next();
        });
        hotkeysContainer.addKeys('ctrl+d', () => {
            this.reset$.next();
        });
    }
}
