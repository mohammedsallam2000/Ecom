import { Component } from '@angular/core';
import { CoreService } from '../core.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {

  ValidationErrors:any
  constructor(private _CoreService: CoreService) {

  }

  
  Get500Error() {
    this._CoreService.GetError('Bug/Server-Error').subscribe({
      next: (next) => console.info(next),
      error: (err) => console.error(err)
    });
  }

  Get404Error() {
    this._CoreService.GetError('product/233433').subscribe({
      next: (next) => console.info(next),
      error: (err) => console.error(err)
    });
  }


  Get400Error() {
    this._CoreService.GetError('Bug/Bad-Request').subscribe({
      next: (next) => console.info(next),
      error: (err) => console.error(err)
    });
  }


  Get400ValidationError() {
    this._CoreService.GetError('Bug/Bad-Request/two').subscribe({
      next: (next) => console.info(next),
      error: (err) => this.ValidationErrors = err.errors
    });
    console.log("ValidationError",this.ValidationErrors)
  }

}
