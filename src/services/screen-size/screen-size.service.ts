import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {isMobileDevice} from "../utils";

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private ScreenSize$: BehaviorSubject<number> = new BehaviorSubject<number>(window.innerWidth);
  ScreenSize: Observable<number> = this.ScreenSize$.asObservable();
  private size!: number;
  constructor() {
    this.updateScreenSize(window.innerWidth);
    this.size = window.innerWidth;
    window.addEventListener('resize', () => {
      this.updateScreenSize(window.innerWidth);
    })
  }

  private updateScreenSize(ScreenSize: number): void {
    this.ScreenSize$.next(ScreenSize);
    this.size = ScreenSize
  }

  isSmallDevice(){
    return isMobileDevice() || this.size < 640;
  }
}
