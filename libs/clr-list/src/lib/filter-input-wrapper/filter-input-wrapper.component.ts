import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'hlc-filter-input-wrapper',
    templateUrl: './filter-input-wrapper.component.html',
    styleUrls: ['./filter-input-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterInputWrapperComponent implements OnInit {
    @Input() label: string;

    constructor() {}

    ngOnInit() {}
}
