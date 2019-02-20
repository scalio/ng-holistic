import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'hlc-clr-sandbox-action-button-page',
    templateUrl: './action-button-page.component.html',
    styleUrls: ['./action-button-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonPageComponent implements OnInit {
    action = timer(1000);

    constructor() {}

    ngOnInit() {}
}
