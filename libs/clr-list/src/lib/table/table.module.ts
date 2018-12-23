import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { TableComponent } from './table.component';
import { ClrDatagridModule, ClrLoadingModule } from '@clr/angular';
import { TableCellHostDirective } from './table-cell-host.directive';
import { cellComponents, cellsMap } from '../cells/cells';
import { HLC_CLR_TABLE_CELL_MAP, TableCellMap } from './table.config';
import { CustomCellDirective } from './custom-cell.directive';
import { TableCustomCellHostDirective } from './table-custom-cell-host.directive';
import { SelectModule } from '@ng-holistic/clr-controls';
import { RowDetailDirective } from './row-detail.directive';

@NgModule({
    imports: [CommonModule, ClrDatagridModule, ClrLoadingModule, SelectModule],
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
