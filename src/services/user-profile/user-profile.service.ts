import { Injectable } from '@angular/core';
import {UserProfile} from "../../model/user-profile";
import {GenericService} from "../GenericService";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService extends GenericService<UserProfile>{

  constructor() {
    super("user-profile");
  }
}
