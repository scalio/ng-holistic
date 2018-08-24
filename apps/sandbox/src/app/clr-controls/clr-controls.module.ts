import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClrControlsComponent } from './clr-controls.component';
import { routes, ClrControlsRoutingModule } from './clr-controls.routing.module';

@NgModule({
    declarations: [ClrControlsComponent],
    imports: [CommonModule, RouterModule.forChild(routes), ClrControlsRoutingModule]
})
export class ClrControlsModule {}
