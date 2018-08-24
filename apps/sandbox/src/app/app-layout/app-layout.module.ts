import { NgModule } from '@angular/core';
import { MainLayoutModule } from '@ng-holistic/clr-layout';
import { AppLayoutComponent } from './app-layout.component';

@NgModule({
    declarations: [AppLayoutComponent],
    imports: [MainLayoutModule],
    providers: [],
    bootstrap: []
})
export class AppLayoutModule {}
