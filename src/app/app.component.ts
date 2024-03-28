import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {RegisterComponent} from "./connectionPages/register/register.component";
import {UserService} from "../services/user/user.service";
import {ConnectionComponent} from "./connectionPages/connection/connection.component";
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
  imports: [CommonModule, RouterOutlet, HeaderComponent, RegisterComponent, ConnectionComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  loggedIn: boolean = false;
  title = 'DailyCanvas-web';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    if (this.userService.getIsLoggedIn()) {
      console.log("User is logged in");
      this.loggedIn = true;
    }else {
      console.log("User is not logged in");
      this.loggedIn = false;
    }
    this.userService.isLoggedIn.subscribe((value) => {
      this.loggedIn = value;
    });
  }
}
