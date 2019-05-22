import { Component, OnInit } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';
import { of, Observable } from 'rxjs';

@Component({
    selector: 'hlc-ng-select-page',
    templateUrl: './ng-select-page.component.html',
    styleUrls: ['./ng-select-page.component.scss']
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgSelectPageComponent implements OnInit {
    ages: Observable<NgOption[]> = of([
        { value: '<18', label: 'Under 18' },
        { value: '18', label: '18' },
        { value: '>18', label: 'More than 18' }
    ]);

    constructor() {}

    ngOnInit() {}

}
