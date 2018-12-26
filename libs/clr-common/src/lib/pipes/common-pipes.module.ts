import { NgModule } from '@angular/core';
import { NumberPipe } from './number.pipe';
import { PhonePipe } from './phone.pipe';

@NgModule({
    imports: [],
    declarations: [PhonePipe, NumberPipe],
    exports: [PhonePipe, NumberPipe]
})
export class HlcPipesModule {
    constructor() {}
}
