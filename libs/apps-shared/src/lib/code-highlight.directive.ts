/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    Inject,
    Input,
    NgModule,
    PLATFORM_ID,
    Renderer2,
    ViewContainerRef
} from '@angular/core';

declare var Prism: any;

// tslint:disable

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'code[hlc-code-highlight]' })
// tslint:disable-next-line:directive-class-suffix
export class HlcCodeHighlightDirective implements AfterViewInit {
    private _highlight = '';

    @Input() marginTop: string;

    // Had to use renderer because I wanted to add to existing classes on the code block
    // Didn't want to override them completely
    constructor(
        private _el: ElementRef,
        private renderer: Renderer2,
        @Inject(PLATFORM_ID) private platformId: Object,
        private readonly viewContainer: ViewContainerRef
    ) {}

    ngAfterViewInit(): void {
        this.redraw();
    }

    public redraw() {
        // Only run Prism in browser engines
        if (this._el && this._el.nativeElement && isPlatformBrowser(this.platformId)) {
            const html = Prism.highlight(
                this.viewContainer.element.nativeElement.innerText,
                Prism.languages[this._highlight]
            );
            this.renderer.setProperty(this.viewContainer.element.nativeElement, 'innerText', '');
            const elClass = 'language-' + this._highlight;
            const div = this.renderer.createElement('div');
            this.renderer.addClass(div, elClass);
            this.renderer.setProperty(div, 'innerHTML', html);
            this.renderer.appendChild(this.viewContainer.element.nativeElement, div);

            if (this.marginTop) {
                this.renderer.setStyle(div, 'margin-top', this.marginTop);
            }
        }
    }

    @Input('hlc-code-highlight')
    set highlight(val: string) {
        if (val && val.trim() !== '') {
            this._highlight = val;
        }
    }

    get highlight(): string {
        return this._highlight;
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [HlcCodeHighlightDirective],
    exports: [HlcCodeHighlightDirective]
})
export class HlcCodeHighlightModule {}
