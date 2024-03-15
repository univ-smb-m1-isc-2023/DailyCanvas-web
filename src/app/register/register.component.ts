import { Component } from '@angular/core';
import {User} from "../../model/user";
import { LocalstoreService } from '../../services/localstore/localstore.service';
import {UserService} from "../../services/user/user.service";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loading = false;
  error = false;
  userDetails = {
    username: '',
    email: '',
    password: ''
  }

  constructor(private userService: UserService) {}

  async register(form: any) {
    this.loading = true;
    let res = await this.userService.register(this.userDetails);
    if (!res) {
      this.error = true
    }
    this.loading = false;
  }

}
