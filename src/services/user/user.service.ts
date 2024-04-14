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

  constructor(private localstore: LocalstoreService<User>, private tokenLocalstore: LocalstoreService<string>) {
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

  async getIsLoggedIn() {
    let valtoken = await this.validToken()
    return this.localstore.get('user') != null && valtoken;
  }

  //get if localstore token is valid or no and remove it from localstore if not valid
  async validToken(){
    try {
      let res = await axios.get(`${API_URL}/auth/`);
      if (res.data == true) {
        this._isLoggedIn.next(true);
        console.log('user localstore', this.localstore.get('user'));
        return true;
      }
    }catch (e){
    }
    this.disconnect();
    return false
  }

  async register(user : Omit<User, 'id'>): Promise<boolean | number> {
    try {
      let res = await axios.post(`${API_URL}/auth/register`, user);
      if (res.status != 200) {
        return res.status;
      }
      let data = res.data;
      if (!data) {
        return false;
      }
      this.localstore.set("user",data.user);
      this.tokenLocalstore.set("token",data.token);
      this._isLoggedIn.next(true);
      return true;
    }catch (e: any) {
      console.log(e)
      return e.response.status;
    }
  }

  async login(user : Pick<User, 'email' | 'password'>): Promise<boolean> {
    let res = await axios.post(`${API_URL}/auth/login`, user);
    if (res.status != 200) {
      return false;
    }
    this.localstore.set("user",res.data.user);
    this.tokenLocalstore.set("token",res.data.token);
    this._isLoggedIn.next(true);
    console.log('login User : ', user);
    return true;
  }

  disconnect() {
    this.localstore.remove('user');
    this.tokenLocalstore.remove('token')
    this._isLoggedIn.next(false);
  }

  async googleAuthRequest(options: {firstname: string, lastname: string, name: string, email: string}) {
    let res = await axios.post(`${API_URL}/auth/googleregister`, options);
    if (res.status != 200) {
      return false;
    }
    this.localstore.set("user",res.data.user);
    this.tokenLocalstore.set("token",res.data.token);
    this._isLoggedIn.next(true);
    return true;
  }
}
