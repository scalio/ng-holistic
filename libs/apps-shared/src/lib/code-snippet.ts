/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CodeHighlight } from './code-highlight';

/* tslint:disable */

@Component({
    selector: 'clr-code-snippet',
    template: `
        <pre><code [clr-code-highlight]="'language-'+language">{{code.trim()}}</code></pre>
    `,
    styles: [
        `
            pre {
                background: transparent;
                padding: 12px;
                max-height: none;
            }
        `
    ]
})
export class CodeSnippet implements AfterViewInit {
    @ViewChild(CodeHighlight, { static: false })
    codeHighlight: CodeHighlight;

    @Input('clrCode') public code: string;
    @Input('clrLanguage') public language: string = 'ts';
    
    ngAfterViewInit(): void {
        if (this.codeHighlight) {
            this.codeHighlight.redraw();
        }
    }
}
