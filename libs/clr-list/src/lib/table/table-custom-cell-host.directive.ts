import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { CustomCellDirective } from './custom-cell.directive';
import { Table } from './table.types';

@Directive({
    selector: '[hlcTableCustomCellHost]'
})
export class TableCustomCellHostDirective implements OnInit {
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

    ngOnInit() {
        const view = this.vcr.createEmbeddedView(this.directive.templateRef, {
            $implicit: this.row[this.cell.id],
            row: this.row,
            cell: this.cell
        });

        this.vcr.insert(view);
    }
}
