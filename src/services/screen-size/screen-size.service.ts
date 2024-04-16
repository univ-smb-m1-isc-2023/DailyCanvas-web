import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

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
    return this.isMobileDevice() || this.size < 640;
  }

  isMobileDevice() {
    return (navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i));
  }
}
