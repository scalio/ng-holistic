import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[hlcClrWizardCustomPage]'
})
export class HlcClrWizardCustomPageDirective {

    @Input()
    hlcClrWizardCustomPage: string;

    constructor(public readonly templateRef: TemplateRef<any>) {}
}
