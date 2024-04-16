import { Component } from '@angular/core';
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {GoogleLoginComponent} from "../google-login/google-login.component";
import {ScreenSizeService} from "../../../services/screen-size/screen-size.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-connection',
  standalone: true,
    imports: [
        RegisterComponent,
        LoginComponent,
        GoogleLoginComponent,
        NgIf
    ],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent {
  page = 2;

  constructor(private screenSizeService: ScreenSizeService) {
  }
  changePage($event: number) {
    this.page = $event;
  }

  isMobileDevice(){
    return this.screenSizeService.isMobileDevice();
  }
}
