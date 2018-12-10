import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'hlc-clr-sandbox-img-overlay-page',
    templateUrl: './img-overlay-page.component.html',
    styleUrls: ['./img-overlay-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImgOverlayPageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
