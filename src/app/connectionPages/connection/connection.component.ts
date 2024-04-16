import {Component, Input, Output} from '@angular/core';
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {GoogleLoginComponent} from "../google-login/google-login.component";
import {ConfidentialityRulesComponent} from "../../utils/confidentiality-rules/confidentiality-rules.component";
import {UtilisationConditionsComponent} from "../../utils/utilisation-conditions/utilisation-conditions.component";
import {DiscordLoginComponent} from "../discord-login/discord-login.component";

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [
    RegisterComponent,
    LoginComponent,
    GoogleLoginComponent,
    ConfidentialityRulesComponent,
    UtilisationConditionsComponent,
    DiscordLoginComponent,
  ],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent {
  @Input("page")
  page:number = 2;

  changePage($event: number) {
    this.page = $event;
  }
}
