import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrAlertModule, ClrWizardModule } from '@clr/angular';
import { HlcClrTextModule } from '@ng-holistic/clr-controls';
import { clrFieldsLayoutMap, HlcClrFormModule, HlcClrInputContainerModule } from '@ng-holistic/clr-forms';
import { CustomFieldDirective, HLC_FIELDS_LAYOUT_MAP } from '@ng-holistic/forms';
import { HlcClrWizardCustomPageDirective } from './wizard-custom-page.directive';
import { HlcClrWizardComponent } from './wizard.component';

@NgModule({
    imports: [
        CommonModule,
        ClrWizardModule,
        HlcClrFormModule,
        HlcClrInputContainerModule,
        HlcClrTextModule,
        ClrAlertModule
    ],
    declarations: [HlcClrWizardComponent, HlcClrWizardCustomPageDirective],
    exports: [HlcClrWizardComponent, HlcClrWizardCustomPageDirective, CustomFieldDirective],
    providers: [
        {
            provide: HLC_FIELDS_LAYOUT_MAP,
            multi: true,
            useValue: clrFieldsLayoutMap
        } /*,
        {
            provide: HLC_FORM_FIELD_WRAPPER,
            useValue: InputContainerComponent
        }
        */
    ]
})
export class HlcClrWizardModule {}
