import { Component } from '@angular/core';
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {GoogleLoginComponent} from "../google-login/google-login.component";

@Component({
  selector: 'app-connection',
  standalone: true,
    imports: [
        RegisterComponent,
        LoginComponent,
        GoogleLoginComponent,
    ],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent {
  page = 2;

  changePage($event: number) {
    this.page = $event;
  }
}
