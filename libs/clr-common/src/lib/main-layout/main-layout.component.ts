import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { SideNavItem } from '../side-nav/side-nav.types';

@Component({
    selector: 'hlc-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrMainLayoutComponent implements OnInit {
    @Input() sideNavItems: SideNavItem[] | undefined;
    @Input() contentTemplate: TemplateRef<any>;

    constructor() {}

    ngOnInit() {}
}
