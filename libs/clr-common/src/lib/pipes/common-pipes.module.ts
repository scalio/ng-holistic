import { NgModule } from '@angular/core';
import { HlcNumberPipe } from './number.pipe';
import { HlcPhonePipe } from './phone.pipe';

@NgModule({
    imports: [],
    declarations: [HlcPhonePipe, HlcNumberPipe],
    exports: [HlcPhonePipe, HlcNumberPipe]
})
export class HlcPipesModule {
    constructor() {}
}
