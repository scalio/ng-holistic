import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'hlc-sbx-render-def-code-example',
    templateUrl: './render-def-code-example.component.html',
    styleUrls: ['./render-def-code-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcSbxRenderDefCodeComponent implements OnInit {
    // @obsolete
    @Input() useDefaultCode: boolean;

    // @obsolete
    @Input() html: string;

    @Input() definition: string;
    @Input() srcUrl: string;

    constructor(private readonly sanitizer: DomSanitizer) {
    }

    get safeSrcUrl() {
        return this.srcUrl && this.sanitizer.bypassSecurityTrustResourceUrl(this.srcUrl);
    }

    ngOnInit() {}
}
