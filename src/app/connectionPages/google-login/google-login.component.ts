import { Component } from '@angular/core';
import {GoogleSigninButtonModule, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [
    GoogleSigninButtonModule
  ],
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.css'
})
export class GoogleLoginComponent {
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;

  constructor(private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      console.log(user)
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
}
