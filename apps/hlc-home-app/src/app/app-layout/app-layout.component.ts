import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import SIDE_NAV_ITEMS from './side-nav-items';

@Component({
    selector: 'hlc-app-layout',
    templateUrl: './app-layout.component.html',
    styleUrls: ['./app-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent implements OnInit {
    readonly sideNavItems = SIDE_NAV_ITEMS;
    readonly navLinks = [
        {
            title: 'Forms',
            href: environment.appUrls.forms
        },
        {
            title: 'Lists',
            href: environment.appUrls.forms
        },
        {
            title: 'Common',
            href: environment.appUrls.common
        }
    ];
    readonly titleHref = environment.appUrls.home;

    constructor() {}

    ngOnInit() {}
}
