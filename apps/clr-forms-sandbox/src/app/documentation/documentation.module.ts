import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageModule } from './home-page/home-page.module';

export const rootRoutes = [
    {
        path: 'home',
        component: HomePageComponent
    }
];

@NgModule({
    imports: [HomePageModule],
    exports: []
})
export class DocumentationModule {}
