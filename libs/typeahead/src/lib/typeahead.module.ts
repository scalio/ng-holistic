import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlcResultsContentComponent } from './results-container/results-container.component';
import { HlcResultItemComponent } from './result-item/result-item.component';
import { HlcTypeaheadDirective } from './typeahead.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
    imports: [CommonModule, OverlayModule, A11yModule],
    declarations: [HlcResultsContentComponent, HlcResultItemComponent, HlcTypeaheadDirective],
    exports: [HlcTypeaheadDirective],
    entryComponents: [HlcResultsContentComponent]
})
export class HlcTypeaheadDirectiveModule {}
