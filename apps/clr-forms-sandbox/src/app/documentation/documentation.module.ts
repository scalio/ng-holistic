import { NgModule } from '@angular/core';
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
    }
];

@NgModule({
    imports: [HomePageModule, InputsListPageModule],
    exports: []
})
export class DocumentationModule {}
