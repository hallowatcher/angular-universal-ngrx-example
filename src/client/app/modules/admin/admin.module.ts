import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [ CommonModule, AdminRoutingModule ],
  exports: [],
  providers: [],
})
export class AdminModule {}
