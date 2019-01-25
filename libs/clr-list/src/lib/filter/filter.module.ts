import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { clrFieldsLayoutMap, HlcClrFormModule, clrGroupLayoutsMap } from '@ng-holistic/clr-forms';
import { HLC_FIELDS_LAYOUT_MAP, HLC_GROUPS_LAYOUT } from '@ng-holistic/forms';
import { HlcClrFilterInputWrapperComponent } from '../filter-input-wrapper/filter-input-wrapper.component';
import { HlcClrFilterInputWrapperModule } from '../filter-input-wrapper/filter-input-wrapper.module';
import { HlcClrFilterComponent } from './filter.component';

@NgModule({
    imports: [CommonModule, HlcClrFormModule, HlcClrFilterInputWrapperModule],
    declarations: [HlcClrFilterComponent],
    exports: [HlcClrFilterComponent],
    entryComponents: [HlcClrFilterInputWrapperComponent]
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
