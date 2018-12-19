import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FilterComponent } from './filter.component';
import { ClrFormModule } from '@ng-holistic/clr-forms';
import { FilterInputWrapperComponent } from '../filter-input-wrapper/filter-input-wrapper.component';
import { HlcClrFilterInputWrapperModule } from '../filter-input-wrapper/filter-input-wrapper.module';

@NgModule({
    imports: [CommonModule, ClrFormModule, HlcClrFilterInputWrapperModule],
    declarations: [FilterComponent],
    exports: [FilterComponent],
    entryComponents: [FilterInputWrapperComponent]
})
export class HlcClrFilterModule {
    static forRoot(): ModuleWithProviders {
        const { providers } = ClrFormModule.forRoot();
        return {
            ngModule: HlcClrFilterModule,
            providers
        };
    }
}
