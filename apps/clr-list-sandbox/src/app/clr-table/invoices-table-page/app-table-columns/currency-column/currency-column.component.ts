import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { HlcDefaultBindValue } from '@ng-holistic/forms';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'hlc-currency-column',
    templateUrl: './currency-column.component.html',
    styleUrls: ['./currency-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyColumnComponent implements OnInit {
    @HlcDefaultBindValue
    @Input()
    currency: string;

    constructor() {}

    ngOnInit() {}
}
