import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'hlc-clr-group-layout',
    templateUrl: './group-layout.component.html',
    styleUrls: ['./group-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrGroupLayoutComponent {
    @Input() title: string;

    //@ts-ignore
    @ViewChild('vc', { read: ViewContainerRef, static: false })
    vc: ViewContainerRef;

    constructor() {}
}
