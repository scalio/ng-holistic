import { Directive, EmbeddedViewRef, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { CustomCellDirective } from './custom-cell.directive';
import { Table } from './table.types';

@Directive({
    selector: '[hlcTableCustomCellHost]'
})
export class TableCustomCellHostDirective implements OnInit, OnChanges {
    view: EmbeddedViewRef<any>;

    // tslint:disable-next-line:no-input-rename
    @Input('hlcTableCustomCellHostDirective')
    directive: CustomCellDirective;

    // tslint:disable-next-line:no-input-rename
    @Input('hlcTableCustomCellHost')
    cell: Table.CustomColumn;

    // tslint:disable-next-line:no-input-rename
    @Input('hlcTableCustomCellHostRow')
    row: any;

    constructor(private readonly vcr: ViewContainerRef) {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['row'] && changes['row'].previousValue !== changes['row'].currentValue) {
            if (this.view) {
                this.vcr.clear();
            }

            this.view = this.vcr.createEmbeddedView(this.directive.templateRef, {
                $implicit: this.row[this.cell.id],
                row: this.row,
                cell: this.cell
            });

            this.vcr.insert(this.view);
        }
    }
}
