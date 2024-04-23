import {Component, Input, OnInit, Output} from '@angular/core';
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {GoogleLoginComponent} from "../google-login/google-login.component";
import {ScreenSizeService} from "../../../services/screen-size/screen-size.service";
import {NgIf} from "@angular/common";
import {ConfidentialityRulesComponent} from "../../utils/confidentiality-rules/confidentiality-rules.component";
import {UtilisationConditionsComponent} from "../../utils/utilisation-conditions/utilisation-conditions.component";
import {DiscordLoginComponent} from "../discord-login/discord-login.component";
import {DailyCanvasInfosComponent} from "../../daily-canvas-infos/daily-canvas-infos.component";
import {ConnectionPageService} from "../../../services/connectionPage/connection-page.service";

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [
    RegisterComponent,
    LoginComponent,
    GoogleLoginComponent,
    NgIf,
    ConfidentialityRulesComponent,
    UtilisationConditionsComponent,
    DiscordLoginComponent,
    DailyCanvasInfosComponent,
  ],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent implements OnInit{
  @Input("page")
  page:number = 6;

  constructor(private screenSizeService: ScreenSizeService, private connectionPage: ConnectionPageService) {
  }
  changePage($event: number) {
    this.page = $event;
  }

  isMobileDevice(){
    return this.screenSizeService.isMobileDevice();
  }

  ngOnInit() {
    this.connectionPage.numPage.subscribe((value) => {
      this.page = value;
    });
  }
}
