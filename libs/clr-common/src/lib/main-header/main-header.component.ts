import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

export interface NavLink {
    title: string;
    icon?: string;
    href?: string;
}

@Component({
    selector: 'hlc-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrMainHeaderComponent implements OnInit {
    @Input() logo: string | undefined;
    @Input() title: string | undefined;

    @Input() titleHref: string | undefined;
    @Input() activeNavLinkIndex: number | undefined;
    @Input() navLinks: NavLink[] | undefined;

    constructor() {}

    ngOnInit() {}

    trackByLink(i: number) {
        return i;
    }
}
