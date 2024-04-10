import { Component } from '@angular/core';
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {AddPasswordGoogleComponent} from "../add-password-google/add-password-google.component";

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [
    RegisterComponent,
    LoginComponent,
    AddPasswordGoogleComponent
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
