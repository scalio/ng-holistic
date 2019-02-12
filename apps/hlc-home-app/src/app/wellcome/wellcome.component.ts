import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
    selector: 'hlc-wellcome',
    templateUrl: './wellcome.component.html',
    styleUrls: ['./wellcome.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WellcomeComponent implements OnInit {

    readonly appUrls = environment.appUrls;

    constructor() {}

    ngOnInit() {}
}
