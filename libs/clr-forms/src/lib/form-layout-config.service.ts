import { Injectable } from '@angular/core';
import { FieldsLayoutConfig } from '@ng-holistic/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum HlcClrFormLayoutType {
    Vertical = 'vertical',
    Horizontal = 'horizontal',
    Compact = 'compact'
}

@Injectable({ providedIn: 'root' })
export class HlcClrFormLayoutConfigService implements FieldsLayoutConfig {
    private static readonly _layoutType$ = new BehaviorSubject(HlcClrFormLayoutType.Vertical);
    readonly formClass: Observable<string>;

    constructor() {
        this.formClass = this.layoutType$.pipe(map(layoutType => `clr-form clr-form-${layoutType}`));
    }

    private get layoutType$() {
        return HlcClrFormLayoutConfigService._layoutType$;
    }

    set layoutType(val: HlcClrFormLayoutType) {
        this.layoutType$.next(val);
    }

    get layoutType() {
        return this.layoutType$.getValue();
    }
}
