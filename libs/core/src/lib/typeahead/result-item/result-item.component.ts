import { Component, OnInit, Input, ElementRef, TemplateRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'hlc-result-item',
    templateUrl: './result-item.component.html',
    styleUrls: ['./result-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class ResultItemComponent implements OnInit {
    @Input() result: any;
    @Input() resultTemplate: TemplateRef<any>;

    isActive: boolean;

    constructor(private elementRef: ElementRef) {}

    ngOnInit() {}

    setActiveStyles() {
        this.isActive = true;
    }

    setInactiveStyles() {
        this.isActive = false;
    }

    scrollIntoView() {
        this.elementRef.nativeElement.scrollIntoView(false);
    }
}
