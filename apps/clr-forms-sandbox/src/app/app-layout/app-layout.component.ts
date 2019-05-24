import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppConfigModalService } from '@apps/shared';
import { ClrIfOpen } from '@clr/angular';
import { HlcClrFormLayoutConfigService, HlcClrFormLayoutType } from '@ng-holistic/clr-forms';
import { environment } from '../../environments/environment';
import SIDE_NAV_ITEMS from './side-nav-items';

const viewOptions = [
    { key: HlcClrFormLayoutType.Vertical, label: 'Vertical' },
    { key: HlcClrFormLayoutType.Horizontal, label: 'Horizontal' },
    { key: HlcClrFormLayoutType.Compact, label: 'Compact' }
];

@Component({
    selector: 'hlc-app-layout',
    templateUrl: './app-layout.component.html',
    styleUrls: ['./app-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ClrIfOpen]
})
export class AppLayoutComponent implements OnInit {
    sideNavItems = SIDE_NAV_ITEMS;
    viewOptions = viewOptions;
    readonly navLinks = [
        {
            title: 'Forms',
            href: environment.appUrls.forms
        },
        {
            title: 'Lists',
            href: environment.appUrls.lists
        },
        {
            title: 'Common',
            href: environment.appUrls.common
        }
    ];
    readonly titleHref = environment.appUrls.forms;
    readonly activeNavLinkIndex = 0;

    constructor(
        readonly cdr: ChangeDetectorRef,
        private readonly formLayoutConfigService: HlcClrFormLayoutConfigService,
        private readonly appConfigModalService: AppConfigModalService
    ) {}

    get viewOptionsValue() {
        return this.formLayoutConfigService.layoutType;
    }

    ngOnInit() {}

    onViewChanged(formLayoutType: HlcClrFormLayoutType) {
        this.formLayoutConfigService.layoutType = formLayoutType;
        this.cdr.detectChanges();
    }

    onConfig() {
        this.appConfigModalService.show();
    }
}
