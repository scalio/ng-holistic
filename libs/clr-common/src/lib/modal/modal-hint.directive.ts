import { Directive, HostListener, Input, TemplateRef } from '@angular/core';
import { HlcClrModalService } from './modal.service';

@Directive({
    selector: '[hlcClrModalHint]'
})
export class HlcClrModalHintDirective {
    @Input() hlcClrModalHint: TemplateRef<any>;
    @Input() hlcClrModalHintTitle: string;

    constructor(private readonly modalService: HlcClrModalService) {}

    @HostListener('click', ['$event']) onClick($event: MouseEvent) {
        $event.preventDefault();
        $event.stopPropagation();
        this.modalService.showTemplate({
            title: this.hlcClrModalHintTitle,
            contentComponentTemplate: this.hlcClrModalHint,
            hideFooter: true
        });
    }
}
