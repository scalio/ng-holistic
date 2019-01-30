import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { WellcomeComponent } from './wellcome/wellcome.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/wellcome',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: 'wellcome',
                component: WellcomeComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), AppLayoutModule],
    declarations: [WellcomeComponent],
    exports: [RouterModule]
})
export class AppRoutingModule {}
