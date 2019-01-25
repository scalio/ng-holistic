import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import SIDE_NAV_ITEMS from './side-nav-items';

@Component({
    selector: 'hlc-app-layout',
    templateUrl: './app-layout.component.html',
    styleUrls: ['./app-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent implements OnInit {
    sideNavItems = SIDE_NAV_ITEMS;
    constructor() {}

    ngOnInit() {}
}
