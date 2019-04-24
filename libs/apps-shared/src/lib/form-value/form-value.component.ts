import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'hlc-sbx-form-value',
    templateUrl: './form-value.component.html',
    styleUrls: ['./form-value.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcSbxFormValueComponent implements OnInit {
    @Input() value: string;

    constructor() {}

    ngOnInit() {}
}
