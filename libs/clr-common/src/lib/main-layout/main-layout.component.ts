import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SideNavItem } from '../side-nav/side-nav.types';

@Component({
    selector: 'hlc-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrMainLayoutComponent implements OnInit {
    @Input() sideNavItems: SideNavItem[] | undefined;

    constructor() {}

    ngOnInit() {}
}
