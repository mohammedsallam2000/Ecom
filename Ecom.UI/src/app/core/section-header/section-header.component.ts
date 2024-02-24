import { Component } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbModule } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {

}
