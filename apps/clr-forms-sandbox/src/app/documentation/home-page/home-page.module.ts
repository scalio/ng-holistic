import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { HomePageComponent } from './home-page.component';

@NgModule({
    declarations: [HomePageComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule],
    exports: [HomePageComponent]
})
export class HomePageModule {}
