import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'hlc-sbx-example-link-button',
    templateUrl: './example-link-button.component.html',
    styleUrls: ['./example-link-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcSbxExampleLinkButtonComponent implements OnInit {

    @Input() title = 'Example';
    @Input() href: string;

    @Input() linkLike = true;

    constructor() {}

    ngOnInit() {}

    onClick() {
        window.open(this.href, '_blank');
    }
}
