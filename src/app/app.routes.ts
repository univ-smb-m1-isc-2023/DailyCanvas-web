import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AccountComponent} from "./account/account.component";
import {RegisterComponent} from "./connectionPages/register/register.component";
import {LoginComponent} from "./connectionPages/login/login.component";
import {ConfidentialityRulesComponent} from "./utils/confidentiality-rules/confidentiality-rules.component";
import {UtilisationConditionsComponent} from "./utils/utilisation-conditions/utilisation-conditions.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'confidentiality', component: ConfidentialityRulesComponent},
  { path: 'conditions', component: UtilisationConditionsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
