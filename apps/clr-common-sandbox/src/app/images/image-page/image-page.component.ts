import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'hlc-clr-sandbox-image-page',
    templateUrl: './image-page.component.html',
    styleUrls: ['./image-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagePageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
