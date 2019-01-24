import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'hlc-group-layout',
    templateUrl: './group-layout.component.html',
    styleUrls: ['./group-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrGroupLayoutComponent {
    @Input() title: string;

    @ViewChild('vc', { read: ViewContainerRef })
    vc: ViewContainerRef;

    constructor() {}
}
