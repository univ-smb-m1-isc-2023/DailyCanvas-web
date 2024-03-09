import { Injectable } from '@angular/core';
import axios from "axios";
import {API_URL} from "../utils";
import {User} from "../../model/user";
import {GenericService} from "../GenericService";

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User>{

  constructor() {
    super("user");
  }
}
