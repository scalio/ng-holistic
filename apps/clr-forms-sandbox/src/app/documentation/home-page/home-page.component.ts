import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'hlc-clr-sandbox-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
