import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConnectionPageService {
  private _numPage = new Subject<number>();
  constructor() {}

  changePage(num: number) {
    this._numPage.next(num);
  }

  get numPage() {
    return this._numPage.asObservable();
  }

}
