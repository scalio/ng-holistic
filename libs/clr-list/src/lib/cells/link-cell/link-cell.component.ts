import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'hlc-link-cell',
    templateUrl: './link-cell.component.html',
    styleUrls: ['./link-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkCellComponent implements OnInit {
    @Input() title: string;
    @Input() link: any;

    @Output() clicked = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {}

    onClick() {
        this.clicked.emit(this.link);
    }
}
