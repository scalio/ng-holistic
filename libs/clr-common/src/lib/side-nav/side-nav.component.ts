import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrSideNavComponent implements OnInit {
    collapsed: boolean;
    @Input() items: SideNavItem[];

    constructor() {}

    ngOnInit() {}
}
