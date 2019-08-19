import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'hlc-sbx-example-link-button',
    templateUrl: './example-link-button.component.html',
    styleUrls: ['./example-link-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcSbxExampleLinkButtonComponent implements OnInit {
    @Input() title = 'Example';
    @Input() href: string | string[];

    @Input() linkLike = true;

    constructor(private readonly router: Router) {}

    ngOnInit() {}

    onClick() {
        if (typeof this.href === 'string') {
            window.open(this.href, '_blank');
        } else {
            this.router.navigate(this.href);
        }
    }
}
