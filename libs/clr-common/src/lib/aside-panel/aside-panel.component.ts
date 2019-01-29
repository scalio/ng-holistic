import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'hlc-clr-aside-panel',
    templateUrl: './aside-panel.component.html',
    styleUrls: ['./aside-panel.component.scss']
})
export class HlcClrAsidePanelComponent implements OnInit {
    @Output()
    close = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
