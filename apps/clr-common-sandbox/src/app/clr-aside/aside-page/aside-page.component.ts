import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'hlc-clr-sandbox-aside-page',
    templateUrl: './aside-page.component.html',
    styleUrls: ['./aside-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsidePageComponent implements OnInit {

    isOpen = false;

    constructor() {}

    ngOnInit() {}
}
