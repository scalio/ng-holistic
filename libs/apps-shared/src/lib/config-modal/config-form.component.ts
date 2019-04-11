import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { HlcHotkeysConfigService } from '@ng-holistic/clr-common';
import { HlcClrFormLayoutConfigService, HlcClrFormLayoutType } from '@ng-holistic/clr-forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { formLayout } from './config-form.definition';

@Component({
    selector: 'hlc-config-form',
    templateUrl: './config-form.component.html',
    styleUrls: ['./config-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormComponent implements OnInit, OnDestroy {
    destroy$ = new Subject();
    formLayout: any;
    constructor(formLayoutConfigService: HlcClrFormLayoutConfigService, hotkeysConfigService: HlcHotkeysConfigService) {
        const useKeysChanged = new Subject<boolean>();
        const formLayoutChanged = new Subject<HlcClrFormLayoutType>();

        this.formLayout = formLayout({
            useKeys: hotkeysConfigService.useKeys,
            formLayout: formLayoutConfigService.layoutType,
            useKeysChanged,
            formLayoutChanged
        });

        formLayoutChanged.pipe(takeUntil(this.destroy$)).subscribe(val => {
            formLayoutConfigService.layoutType = val;
        });

        useKeysChanged.pipe(takeUntil(this.destroy$)).subscribe(val => {
            hotkeysConfigService.useKeys = val;
        });
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.destroy$.next();
    }
}
