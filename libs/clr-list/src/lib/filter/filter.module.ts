import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { clrFieldsLayoutMap, ClrFormModule, clrGroupLayoutsMap } from '@ng-holistic/clr-forms';
import { HLC_FIELDS_LAYOUT_MAP, HLC_GROUPS_LAYOUT } from '@ng-holistic/forms';
import { FilterInputWrapperComponent } from '../filter-input-wrapper/filter-input-wrapper.component';
import { HlcClrFilterInputWrapperModule } from '../filter-input-wrapper/filter-input-wrapper.module';
import { FilterComponent } from './filter.component';

@NgModule({
    imports: [CommonModule, ClrFormModule, HlcClrFilterInputWrapperModule],
    declarations: [FilterComponent],
    exports: [FilterComponent],
    entryComponents: [FilterInputWrapperComponent]
})
export class HlcClrFilterModule {
    static forRoot(): ModuleWithProviders {
        // TODO: Export clr-forms providers ?
        return {
            ngModule: HlcClrFilterModule,
            providers: [
                {
                    provide: HLC_FIELDS_LAYOUT_MAP,
                    multi: true,
                    useValue: clrFieldsLayoutMap
                },
                {
                    provide: HLC_GROUPS_LAYOUT,
                    multi: true,
                    useValue: clrGroupLayoutsMap
                }
            ]
        };
    }
}
