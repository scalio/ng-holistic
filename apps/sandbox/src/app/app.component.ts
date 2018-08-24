import { Component } from '@angular/core';

import SIDE_NAV_ITEMS from './side-nav-items';

@Component({
    selector: 'hlc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    sideNavItems = SIDE_NAV_ITEMS;
    constructor() {}
}
