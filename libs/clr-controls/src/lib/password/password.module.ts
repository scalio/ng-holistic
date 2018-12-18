import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrPasswordModule } from '@clr/angular';
import { PasswordComponent } from './password.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ClrPasswordModule],
    declarations: [PasswordComponent],
    exports: [PasswordComponent]
})
export class PasswordModule {}
