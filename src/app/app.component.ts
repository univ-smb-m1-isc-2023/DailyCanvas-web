import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {RegisterComponent} from "./register/register.component";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet, HeaderComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'DailyCanvas-web';
  loggedIn: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    if (this.userService.getIsLoggedIn()) {
      this.loggedIn = true;
    }
    this.userService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
        this.loggedIn = isLoggedIn;
    });
  }

}
