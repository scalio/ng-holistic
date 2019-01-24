import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasswordComponent } from './password.component';
import { ClrPasswordModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, ClrPasswordModule],
    declarations: [PasswordComponent],
    exports: [PasswordComponent]
})
export class HlcClrPasswordModule {}
