import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../environments/environment';

import SIDE_NAV_ITEMS from './side-nav-items';

@Component({
    selector: 'hlc-clr-sandbox-layout',
    templateUrl: './app-layout.component.html',
    styleUrls: ['./app-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent implements OnInit {
    sideNavItems = SIDE_NAV_ITEMS;

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
    readonly activeNavLinkIndex = 2;

    constructor() {}

    ngOnInit() {}
}
