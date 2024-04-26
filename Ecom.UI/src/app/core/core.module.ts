import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,NavBarComponent,SectionHeaderComponent,RouterModule,ToastrModule.forRoot({
      positionClass:'toast-bottom-right',
      countDuplicates:true
    }),BreadcrumbModule,SharedModule
  ],
  
  exports:[NavBarComponent,SectionHeaderComponent]
})
export class CoreModule { }
