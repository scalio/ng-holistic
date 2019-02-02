import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'hlc-first-form',
    templateUrl: './first-form.component.html',
    styleUrls: ['./first-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstFormComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
