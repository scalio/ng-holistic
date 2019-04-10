import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { formLayout } from './config-form.definition';

@Component({
    selector: 'hlc-config-form',
    templateUrl: './config-form.component.html',
    styleUrls: ['./config-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormComponent implements OnInit {
    formLayout = formLayout;
    constructor() {}

    ngOnInit() {}
}
