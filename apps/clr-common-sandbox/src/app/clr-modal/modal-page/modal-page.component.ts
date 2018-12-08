import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'hlc-clr-sandbox-modal-page',
    templateUrl: './modal-page.component.html',
    styleUrls: ['./modal-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalPageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
