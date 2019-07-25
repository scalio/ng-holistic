import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { HlcDefaultBindValue } from '@ng-holistic/forms';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'hlc-card-number-column',
    templateUrl: './card-number-column.component.html',
    styleUrls: ['./card-number-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardNumberColumnComponent implements OnInit {
    @HlcDefaultBindValue
    @Input()
    cardNumber: string;

    constructor() {}

    ngOnInit() {}

    get cardScheme() {
        if (!this.cardNumber) {
            return null;
        }
        if (this.cardNumber.startsWith('1')) {
            return 'master';
        } else if (this.cardNumber.startsWith('2')) {
            return 'visa';
        } else {
            return null;
        }
    }
}
