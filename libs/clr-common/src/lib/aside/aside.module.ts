import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { HlcAsideDirective } from './aside.directive';
import { HlcAsideService as HlcClrAsideService } from './aside.service';

@NgModule({
    imports: [CommonModule, OverlayModule, ClrIconModule],
    declarations: [HlcAsideDirective],
    exports: [HlcAsideDirective],
    providers: [HlcClrAsideService]
})
export class HlcAsideModule {}
