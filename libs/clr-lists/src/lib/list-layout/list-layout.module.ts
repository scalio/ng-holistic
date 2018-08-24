import { NgModule } from '@angular/core';
import { ListTableModule } from '../list-table';
import { ListLayoutComponent } from './list-layout.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ListTableModule, CommonModule],
    declarations: [ListLayoutComponent],
    exports: [ListLayoutComponent],
})
export class ListLayoutModule {
    constructor() {}
}
