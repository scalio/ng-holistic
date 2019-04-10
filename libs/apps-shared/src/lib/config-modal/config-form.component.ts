import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
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
    constructor(formLayoutConfigService: HlcClrFormLayoutConfigService) {
        const useKeysChanged = new Subject<boolean>();
        const formLayoutChanged = new Subject<HlcClrFormLayoutType>();

        this.formLayout = formLayout({
            useKeys: true,
            formLayout: formLayoutConfigService.layoutType,
            useKeysChanged,
            formLayoutChanged
        });

        formLayoutChanged.pipe(takeUntil(this.destroy$)).subscribe(val => {
            formLayoutConfigService.layoutType = val;
        });
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.destroy$.next();
    }
}
