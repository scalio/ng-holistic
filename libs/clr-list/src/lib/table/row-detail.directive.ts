import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[hlcClrRowDetail]' })
export class RowDetailDirective {
    constructor(public readonly templateRef: TemplateRef<any>) {}
}
