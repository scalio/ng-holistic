import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsSharedModule } from '@apps/shared';
import { InstallPackagesComponent } from './install-packages.component';

@NgModule({
    declarations: [InstallPackagesComponent],
    imports: [CommonModule, AppsSharedModule, RouterModule]
})
export class InstallPackagesModule {}
