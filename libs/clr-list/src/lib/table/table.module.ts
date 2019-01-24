import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClrDatagridModule, ClrIconModule, ClrLoadingModule } from '@clr/angular';
import { HlcClrSelectModule } from '@ng-holistic/clr-controls';
import { cellComponents, cellsMap } from '../cells/cells';
import { CustomCellDirective } from './custom-cell.directive';
import { RowDetailDirective } from './row-detail.directive';
import { TableCellHostDirective } from './table-cell-host.directive';
import { TableCustomCellHostDirective } from './table-custom-cell-host.directive';
import { TableComponent } from './table.component';
import { HLC_CLR_TABLE_CELL_MAP, TableCellMap } from './table.config';

@NgModule({
    imports: [CommonModule, ClrDatagridModule, ClrLoadingModule, HlcClrSelectModule, ClrIconModule],
    declarations: [
        TableComponent,
        TableCellHostDirective,
        CustomCellDirective,
        TableCustomCellHostDirective,
        RowDetailDirective,
        ...cellComponents
    ],
    exports: [TableComponent, CustomCellDirective, RowDetailDirective, ...cellComponents],
    entryComponents: cellComponents
})
export class HlcClrTableModule {
    static forRoot(cells?: TableCellMap): ModuleWithProviders {
        return {
            ngModule: HlcClrTableModule,
            providers: [
                {
                    provide: HLC_CLR_TABLE_CELL_MAP,
                    useValue: cellsMap,
                    multi: true
                },
                {
                    provide: HLC_CLR_TABLE_CELL_MAP,
                    useValue: cells,
                    multi: true
                }
            ]
        };
    }
}
