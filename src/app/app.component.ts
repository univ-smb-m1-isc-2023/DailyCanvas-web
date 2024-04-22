import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {RegisterComponent} from "./connectionPages/register/register.component";
import {UserService} from "../services/user/user.service";
import {ConnectionComponent} from "./connectionPages/connection/connection.component";
import {NavComponent} from "./nav/nav.component";
import {LoginComponent} from "./connectionPages/login/login.component";
import {HomeComponent} from "./home/home.component";

const MODULES =[
  CommonModule,
  RouterOutlet,
  LoginComponent,
  HomeComponent
]
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, RegisterComponent, ConnectionComponent, LoginComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  loggedIn: boolean = false;
  title = 'Daily Canvas';
  page: number = 2;
  numPath = {"register": 1,"login": 2, "conditions": 3, "confidentiality": 4, "discord": 5}

  constructor(private userService: UserService, private router: Router) {
  }

  getConnectionPage(){
    console.log(window.location.pathname)
    for (const [key, value] of Object.entries(this.numPath)){
      if (window.location.pathname.includes(key)){
        this.page = value;
        return true
      }
    }
    return false
  }

  async getIfUserLogIn(){
    let res = await this.userService.getIsLoggedIn()
    if (res) {
      console.log("User is logged in");
      this.loggedIn = true;
    }else {
      console.log("User is not logged in");
      this.loggedIn = false;
    }
  }

  ngOnInit() {
    this.getIfUserLogIn()
    this.getConnectionPage()
    this.userService.isLoggedIn.subscribe((value) => {
      this.loggedIn = value;
    });
  }
}
