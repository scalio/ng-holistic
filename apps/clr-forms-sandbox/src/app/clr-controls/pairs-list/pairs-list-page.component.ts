import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'hlc-pairs-list-page',
    templateUrl: './pairs-list-page.component.html',
    styleUrls: ['./pairs-list-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PairsListPageComponent implements OnInit {
    items = [{ key: 1, label: 'one' }, { key: 2, label: 'two' }];

    constructor() {}

    ngOnInit() {}
}
