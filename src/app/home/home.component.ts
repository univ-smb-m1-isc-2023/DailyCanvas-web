import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import axios from "axios";
import {User} from "../../model/user";
import {NgForOf} from "@angular/common";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  loginInput: string | undefined;
  passwordInput: string | undefined;
  IDInput: string | undefined;
  userList: User[] = [];

  constructor(private userService: UserService) {
  }

  login() {
    console.log('Login: ', this.loginInput);
    console.log('Password', this.passwordInput);
    if (this.loginInput === undefined || this.passwordInput === undefined) {
      return;
    }
    this.userService.create({username: this.loginInput, password: this.passwordInput, email: ""}).then((res) => {
      console.log(res);
    });
  }

  async getUsers() {
    this.userList = await this.userService.getAll();
    console.log("UL : "+this.userList);
  }

  async getUser() {
    if (this.IDInput === undefined) {
      return;
    }
    const id = parseInt(this.IDInput);
    const user : User = await this.userService.get(id);
    console.log(user);
  }

  async updateUser() {
    if (this.IDInput === undefined || this.loginInput === undefined) {
      return;
    }
    const id = parseInt(this.IDInput);
    const user : User = await this.userService.get(id);
    user.username = this.loginInput;
    await this.userService.update(user);
  }

  async deleteUser() {
    if (this.IDInput === undefined) {
      return;
    }
    const id = parseInt(this.IDInput);
    await this.userService.delete(id);
  }

  ngOnInit(): void {
    this.getUsers()
  }
}
