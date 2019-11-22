import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { HlcDefaultBindValue } from '@ng-holistic/forms';

@Component({
    selector: 'hlc-clr-img-cell',
    templateUrl: './img-cell.component.html',
    styleUrls: ['./img-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrImgCellComponent implements OnInit {
    @HlcDefaultBindValue
    @Input() src: string;
    @Input() width: number;
    @Input() height: number;

    constructor(public readonly cdr: ChangeDetectorRef) {}

    ngOnInit() {}
}
