import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'hlc-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrMainHeaderComponent implements OnInit {
    @Input() logo: string | undefined;
    @Input() title: string | undefined;

    constructor() {}

    ngOnInit() {}
}
