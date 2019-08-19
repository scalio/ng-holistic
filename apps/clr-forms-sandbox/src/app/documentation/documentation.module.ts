import { NgModule } from '@angular/core';
import { DduxPageComponent } from './ddux-page/ddux-page.component';
import { DduxPageModule } from './ddux-page/ddux-page.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageModule } from './home-page/home-page.module';
import { InputsListPageComponent } from './inputs-list-page/inputs-list-page.component';
import { InputsListPageModule } from './inputs-list-page/inputs-list-page.module';

export const rootRoutes = [
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'inputs-list',
        component: InputsListPageComponent
    },
    {
        path: 'ddux',
        component: DduxPageComponent
    }
];

@NgModule({
    imports: [HomePageModule, InputsListPageModule, DduxPageModule],
    exports: []
})
export class DocumentationModule {}
