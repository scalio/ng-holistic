import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormLayout } from '@ng-holistic/forms';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'hlc-groups-layout',
    templateUrl: './groups-layout.component.html',
    styleUrls: ['./groups-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsLayoutComponent implements OnInit {
    @Input() formGroup: FormGroup;
    @Input() items: FormLayout.FormGroup[] | undefined;

    constructor() {}

    ngOnInit() {}
}
