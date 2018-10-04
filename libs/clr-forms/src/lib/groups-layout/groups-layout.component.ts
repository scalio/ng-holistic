import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'hlc-groups-layout',
    templateUrl: './groups-layout.component.html',
    styleUrls: ['./groups-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsLayoutComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() title: string;
    @ViewChild('vc', { read: ViewContainerRef })
    vc: ViewContainerRef;

    constructor() {}

    ngOnInit() {}
}
