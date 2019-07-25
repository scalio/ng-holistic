import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({ selector: '[hlcClrCustomCell]' })
export class CustomCellDirective {
    @Input()
    hlcClrCustomCell: string;

    constructor(public readonly templateRef: TemplateRef<any>) {}
}
