import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'hlc-ng-select-page',
    templateUrl: './ng-select-page.component.html',
    styleUrls: ['./ng-select-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgSelectPageComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {}
}
