import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-pager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss'
})
export class PagerComponent {
  @Input() totalCount: number;
  @Input() pageSize: number;

  @Output() pageChanged = new EventEmitter();

  onPagerChanged(event: any) {
    this.pageChanged.emit(event)
  }
}
