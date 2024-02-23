import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import axios from "axios";
import {User} from "../../model/user";
import {NgForOf} from "@angular/common";
import {UserService} from "../user.service";

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
  userList: User[] = [];

  constructor(private userService: UserService) {
  }

  login() {
    console.log('Login: ', this.loginInput);
    console.log('Password', this.passwordInput);
    if (this.loginInput === undefined || this.passwordInput === undefined) {
      return;
    }
    this.userService.inscription({name: this.loginInput, password: this.passwordInput, email: ""}).then((res) => {
      console.log(res);
    });
  }
  async register() {
    console.log('Register: ', this.loginInput);
    let response = undefined
    await axios.post('http://localhost:3000/users', {login: this.loginInput, password: this.passwordInput}).then((res) =>{ response = res.data});
  }

  async getUsers() {
    let res = await axios.get('http://localhost:3000/users');
    this.userList = res.data;
    console.log("UL : "+this.userList);
  }

  ngOnInit(): void {
    this.getUsers()
  }
}
