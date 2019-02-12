import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'hlc-typeahead-page',
    templateUrl: './typeahead-page.component.html',
    styleUrls: ['./typeahead-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeaheadPageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
