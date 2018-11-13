import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({ selector: '[hlcCustomFieldInput]' })
export class CustomFieldInputDirective {}

@Directive({ selector: '[hlcCustomField]' })
export class CustomFieldDirective {
    @Input()
    hlcCustomField: string;

    constructor(public readonly templateRef: TemplateRef<any>) {}
}
