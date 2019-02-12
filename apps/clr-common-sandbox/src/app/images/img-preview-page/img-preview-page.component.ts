import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HlcFilePreviewOverlayService } from '@ng-holistic/clr-common';

@Component({
    selector: 'hlc-clr-sandbox-img-preview-page',
    templateUrl: './img-preview-page.component.html',
    styleUrls: ['./img-preview-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImgPreviewOverlayPageComponent implements OnInit {
    constructor(private readonly filePreviewServaice: HlcFilePreviewOverlayService) {}

    ngOnInit() {}

    onPreviewImage() {
        this.filePreviewServaice.open('https://pbs.twimg.com/media/DuEkvqTW0AIlTSo.jpg');
    }
}
