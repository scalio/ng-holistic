import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'hlc-clr-sandbox-filter-page',
    templateUrl: './filter-page.component.html',
    styleUrls: ['./filter-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPageComponent implements OnInit {

    constructor() {}

    ngOnInit() {}
}
