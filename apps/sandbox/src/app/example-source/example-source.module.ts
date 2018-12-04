import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleSourceComponent } from './example-source.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ExampleSourceComponent],
    exports: [ExampleSourceComponent]
})
export class ExampleSourceModule {}
