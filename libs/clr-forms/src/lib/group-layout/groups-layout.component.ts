import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'hlc-groups-layout',
    templateUrl: './groups-layout.component.html',
    styleUrls: ['./groups-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsLayoutComponent implements OnInit {
    @Input()
    title: string;
    @ViewChild('vc', { read: ViewContainerRef })
    vc: ViewContainerRef;

    constructor() {}

    ngOnInit() {}
}