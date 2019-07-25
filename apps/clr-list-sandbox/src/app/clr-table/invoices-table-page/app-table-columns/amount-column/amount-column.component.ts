import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { HlcDefaultBindValue } from '@ng-holistic/forms';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'hlc-amount-column',
    templateUrl: './amount-column.component.html',
    styleUrls: ['./amount-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmountColumnComponent implements OnInit {
    @Input()
    @HlcDefaultBindValue
    value: number;

    constructor() {}

    ngOnInit() {}
}
