import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AccountComponent} from "./account/account.component";
import {RegisterComponent} from "./connectionPages/register/register.component";
import {LoginComponent} from "./connectionPages/login/login.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
  { path: 'register', outlet: 'connection' , component: RegisterComponent},
  { path: 'login', outlet: 'connection', component: LoginComponent},
  { path: '', outlet: 'connection', redirectTo: '/register', pathMatch: 'full' },
  { path: '**', outlet: 'connection', redirectTo: '/register'},
];
