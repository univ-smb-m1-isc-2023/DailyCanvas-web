import { Component } from '@angular/core';
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [
    RegisterComponent,
    LoginComponent,
  ],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent {
  page = 1;

  changePage($event: number) {
    this.page = $event;
  }
}
