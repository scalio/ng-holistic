import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { HlcHotkeysContainerService } from '../hotkeys/hotkeys-container.service';
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

    constructor(
        private readonly hotkeysContainer: HlcHotkeysContainerService,
        sidenavKeysManager: HlcSideNavKeysManagerService,
        cdr: ChangeDetectorRef
    ) {
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
