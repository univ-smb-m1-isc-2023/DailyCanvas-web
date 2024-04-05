import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstoreService<T> {

  constructor() {}

  get(key: string): T | null {
    if (localStorage.getItem(key) === null) {
      return null;
    }
    return JSON.parse(localStorage.getItem(key) as string);
  }

  set(user: T) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
