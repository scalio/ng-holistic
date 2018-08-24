import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { prop } from 'ramda';

@Component({
    selector: 'hlc-lol',
    templateUrl: './lol.component.html',
    styleUrls: ['./lol.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LolComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        console.log('check ramda package size', prop('a', { a: 1 }));
    }
}
