import { Injectable } from '@angular/core';
import { HlcHotkeysContainerService } from '@ng-holistic/clr-common';
import { Subject } from 'rxjs';

export const enum HlcListElementType {
    ActionBar,
    Table
}

/**
 * This class used by filter and table component
 * just set focus to appropriate table element (filter or table list)
 */
@Injectable()
export class HlcListKeysManagerService {
    readonly focusedElement = new Subject<HlcListElementType>();

    constructor(hotkeysContainer: HlcHotkeysContainerService) {
        hotkeysContainer.addKeys('ctrl+1', () => {
            this.focusedElement.next(HlcListElementType.ActionBar);
        });
        hotkeysContainer.addKeys('ctrl+2', () => {
            this.focusedElement.next(HlcListElementType.Table);
        });
    }
}
