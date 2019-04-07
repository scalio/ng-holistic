import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { HlcHotkeysContainerService } from '../hotkeys-container.service';
import { HlcSideNavKeysManagerService } from './utils/side-nav-keys-manager';

export interface SideNavChildItem {
    title: string;
    path?: any[];
    icon?: string;
}

export interface SideNavItem {
    title: string;
    icon?: string;
    path?: string;
    children?: SideNavChildItem[];
}

@Component({
    selector: 'hlc-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [HlcHotkeysContainerService, HlcSideNavKeysManagerService]
})
export class HlcClrSideNavComponent implements OnInit, OnDestroy {
    collapsed: boolean;
    @Input() items: SideNavItem[];

    @Input() set useKeys(val: boolean) {
        this.hotkeysContainer.useKeys$.next(val);
    }

    get useKeys() {
        return this.hotkeysContainer.useKeys$.getValue();
    }

    constructor(
        private readonly hotkeysContainer: HlcHotkeysContainerService,
        sidenavKeysManager: HlcSideNavKeysManagerService,
        cdr: ChangeDetectorRef
    ) {
        hotkeysContainer.useKeys$.next(true);
        hotkeysContainer.focus$.next(true);
        sidenavKeysManager.toggle$.pipe(takeUntil(this.hotkeysContainer.destroy$)).subscribe(() => {
            this.collapsed = !this.collapsed;
            cdr.markForCheck();
        });
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.hotkeysContainer.destroy$.next();
    }
}
