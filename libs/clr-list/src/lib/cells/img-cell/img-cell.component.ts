import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'hlc-clr-img-cell',
    templateUrl: './img-cell.component.html',
    styleUrls: ['./img-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrImgCellComponent implements OnInit {
    @Input() src: string;
    @Input() width: number;
    @Input() height: number;

    constructor(public readonly cdr: ChangeDetectorRef) {}

    ngOnInit() {}
}
