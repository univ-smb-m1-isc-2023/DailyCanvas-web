import { Injectable } from '@angular/core';
import axios from "axios";
import {API_URL} from "../services/utils";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public async inscription(user: Omit<User, 'id'>): Promise<User>{
    const res: User = await axios.post(`${API_URL}/users/inscription`, user)
    return res;
  }
  public async getUser(id: number): Promise<User> {
    const user : User = await axios.get({API_URL}+"/users/"+id);
    return user;
  }

  private async getAllUsers(id: number): Promise<User[]> {
    const user : User[] = await axios.get({API_URL}+"/users/");
    return user;
  }
}
