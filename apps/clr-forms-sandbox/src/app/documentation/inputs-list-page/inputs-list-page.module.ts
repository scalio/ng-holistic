import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { InputsListPageComponent } from './inputs-list-page.component';

@NgModule({
    declarations: [InputsListPageComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule],
    exports: [InputsListPageComponent]
})
export class InputsListPageModule {}
