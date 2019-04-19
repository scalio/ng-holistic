import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrModalModule } from '@ng-holistic/clr-common';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { ConfigFormComponent } from './config-form.component';
import { AppConfigModalService } from './config-modal.service';

@NgModule({
    imports: [CommonModule, HlcClrFormModule, HlcClrModalModule],
    declarations: [ConfigFormComponent],
    providers: [AppConfigModalService],
    exports: [],
    entryComponents: [ConfigFormComponent]
})
export class AppConfigModule {}
