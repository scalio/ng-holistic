import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsContentComponent } from './results-container/results-container.component';
import { ResultItemComponent } from './result-item/result-item.component';
import { HlcTypeaheadDirective } from './typeahead.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
    imports: [CommonModule, OverlayModule, A11yModule],
    declarations: [ResultsContentComponent, ResultItemComponent, HlcTypeaheadDirective],
    exports: [HlcTypeaheadDirective],
    entryComponents: [ResultsContentComponent]
})
export class TypeaheadDirectiveModule {}
