import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,NavBarComponent
  ],
  exports:[NavBarComponent]
})
export class CoreModule { }
