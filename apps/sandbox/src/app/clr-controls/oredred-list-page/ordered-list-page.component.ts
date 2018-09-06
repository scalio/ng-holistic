import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'hlc-ordered-list-page',
    templateUrl: './ordered-list-page.component.html',
    styleUrls: ['./ordered-list-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderedListPageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
