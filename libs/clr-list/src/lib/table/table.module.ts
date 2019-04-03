import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClrDatagridModule, ClrIconModule, ClrLoadingModule } from '@clr/angular';
import { HlcClrAlertModule, HlcHotKeysModule } from '@ng-holistic/clr-common';
import { HlcClrSelectModule } from '@ng-holistic/clr-controls';
import { cellComponents, cellsMap } from '../cells/cells';
import { CustomCellDirective } from './custom-cell.directive';
import { RowDetailDirective } from './row-detail.directive';
import { SortPipe } from './sort.pipe';
import { TableCellHostDirective } from './table-cell-host.directive';
import { TableCustomCellHostDirective } from './table-custom-cell-host.directive';
import { HlcClrTableComponent } from './table.component';
import { HLC_CLR_TABLE_CELL_MAP, TableCellMap } from './table.config';

@NgModule({
    imports: [
        CommonModule,
        ClrDatagridModule,
        ClrLoadingModule,
        HlcClrSelectModule,
        ClrIconModule,
        HlcClrAlertModule,
        DragDropModule,
        HlcHotKeysModule
    ],
    declarations: [
        HlcClrTableComponent,
        TableCellHostDirective,
        CustomCellDirective,
        TableCustomCellHostDirective,
        RowDetailDirective,
        SortPipe,
        ...cellComponents
    ],
    exports: [HlcClrTableComponent, CustomCellDirective, RowDetailDirective, ...cellComponents],
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
                },
                ...(HlcHotKeysModule.forRoot().providers || [])
            ]
        };
    }
}
