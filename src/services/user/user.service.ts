import { Injectable } from '@angular/core';
import axios from "axios";
import {API_URL} from "../utils";
import {User} from "../../model/user";
import {GenericService} from "../GenericService";
import {Subject} from "rxjs";
import {LocalstoreService} from "../localstore/localstore.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User>{

  private _isLoggedIn = new Subject<boolean>();

  constructor(private localstore: LocalstoreService<User>) {
    super("user");
    if (localstore.get('user')!=null) {
      //vérification de l'utilisateur//

      //-----------------------------//
      this._isLoggedIn.next(true);
      console.log('user localstore', localstore.get('user'));
    }
  }

  get isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }

  getIsLoggedIn() {
    return this._isLoggedIn;
  }

  async register(user : Omit<User, 'id'>): Promise<boolean> {
    let newUser = await this.create(user);
    if (!newUser) {
      return false;
    }
    this.localstore.set(newUser);
    this._isLoggedIn.next(true);
    return true;
  }

  disconnect() {
    this.localstore.remove('user');
    this._isLoggedIn.next(false);
  }
}
