import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';

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

    constructor(public readonly cdr: ChangeDetectorRef) {}

    ngOnInit() {}

    onClick() {
        this.clicked.emit(this.link);
    }
}
