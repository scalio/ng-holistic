import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'hc-lol',
    templateUrl: './lol.component.html',
    styleUrls: ['./lol.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LolComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
