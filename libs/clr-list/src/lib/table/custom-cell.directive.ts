import { Directive, Input, TemplateRef } from '@angular/core';

export function HlcColumnBindValue(_: any, __: string) {
}

@Directive({ selector: '[hlcClrCustomCell]' })
export class CustomCellDirective {
    @Input()
    hlcClrCustomCell: string;

    constructor(public readonly templateRef: TemplateRef<any>) {}
}
