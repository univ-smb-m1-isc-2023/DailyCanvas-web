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
  }

  get isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }

  getLocalUser() : User | undefined{
    let res = this.localstore.get('user');
    if (res == null) {
      return undefined;
    }
    return res;
  }

  getIsLoggedIn() {
    if (this.localstore.get('user')!=null) {
      //vérification de l'utilisateur//

      //-----------------------------//
      this._isLoggedIn.next(true);
      console.log('user localstore', this.localstore.get('user'));
      return true;
    }else {
      this._isLoggedIn.next(false);
      return false;
    }
  }

  async register(user : Omit<User, 'id'>): Promise<boolean> {
    let newUser = await this.create(user);
    if (!newUser) {
      return false;
    }
    this.localstore.set(newUser);
    this._isLoggedIn.next(true);
    console.log('create User : ', user);
    return true;
  }

  async login(user : Pick<User, 'email' | 'password'>): Promise<boolean> {
    let res = await axios.post(`${API_URL}/user/login`, user);
    if (res.status != 200) {
      return false;
    }
    this.localstore.set(res.data);
    this._isLoggedIn.next(true);
    console.log('login User : ', user);
    return true;
  }

  disconnect() {
    this.localstore.remove('user');
    this._isLoggedIn.next(false);
  }
}
