import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AccountComponent} from "./account/account.component";
import {CreateChallengeComponent} from "./challenge/create-challenge/create-challenge.component";
import {RegisterComponent} from "./connectionPages/register/register.component";
import {LoginComponent} from "./connectionPages/login/login.component";
import {ConfidentialityRulesComponent} from "./utils/confidentiality-rules/confidentiality-rules.component";
import {UtilisationConditionsComponent} from "./utils/utilisation-conditions/utilisation-conditions.component";
import {DiscordLoginComponent} from "./connectionPages/discord-login/discord-login.component";
import {FindChallengeComponent} from "./challenge/find-challenge/find-challenge.component";
import {CreateEventComponent} from "./event/create-event/create-event.component";
import {EventsComponent} from "./event/events/events.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountComponent },

  { path: 'event/create', component: CreateEventComponent},
  { path: 'events', component: EventsComponent},

  { path: 'challenge/create', component: CreateChallengeComponent},
  { path: 'challenges', component: FindChallengeComponent},

  { path: 'confidentiality', component: ConfidentialityRulesComponent},
  { path: 'conditions', component: UtilisationConditionsComponent},
  {path: "confidentiality", component: ConfidentialityRulesComponent},
  {path: "conditions", component: UtilisationConditionsComponent},
  {path: "discord/:userName/:idUser", component: DiscordLoginComponent},

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

export const connectionRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "confidentiality", component: ConfidentialityRulesComponent},
  {path: "conditions", component: UtilisationConditionsComponent},
  {path: "discord", component: DiscordLoginComponent},
]
