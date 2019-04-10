import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HlcHotkeysContainerService } from '../../hotkeys/hotkeys-container.service';

@Injectable()
export class HlcSideNavKeysManagerService {
    toggle$ = new Subject();

    constructor(hotkeysContainer: HlcHotkeysContainerService) {
        hotkeysContainer.addKeys('ctrl+b', () => this.toggle$.next());
    }
}
