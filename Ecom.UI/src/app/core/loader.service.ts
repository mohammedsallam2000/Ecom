import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderRequestCount: number = 0
  constructor(private _Spinner: NgxSpinnerService) {

  }
  loader() {
    this.loaderRequestCount++;
    this._Spinner.show(undefined, {
      type: "square-jelly-box",
      color: "#fff",
      bdColor: "rgba(0, 0, 0, 0.8)"
    });
  }

  hidingLoader() {
    this.loaderRequestCount--;
    if(this.loaderRequestCount <= 0){
      this.loaderRequestCount = 0
      this._Spinner.hide();
    }
  }
}

