import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'hlc-clr-img-overlay',
    templateUrl: './img-overlay.component.html',
    styleUrls: ['./img-overlay.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImgOverlayComponent {

    @Input() src: string;
    @Input() width: string;
    @Input() overlayOpacity = 1;
}
