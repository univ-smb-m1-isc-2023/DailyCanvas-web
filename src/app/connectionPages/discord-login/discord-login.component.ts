import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import type {User} from "../../../model/user";
import {UserService} from "../../../services/user/user.service";
import {GoogleLoginComponent} from "../google-login/google-login.component";
import {GoogleSigninButtonModule, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import axios from "axios";
import {API_URL} from "../../../services/utils";

@Component({
  selector: 'app-discord-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    GoogleLoginComponent,
    GoogleSigninButtonModule
  ],
  templateUrl: './discord-login.component.html',
  styleUrl: './discord-login.component.css'
})
export class DiscordLoginComponent implements OnInit{
  loading = false;
  submittedAndInvalid: boolean = false;
  infosDontMatch: boolean = false;
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;
  load: boolean = false;
  discordUsername: string | undefined = undefined;
  discordId: string | undefined = undefined;
  loginError: boolean = false;
  googleError: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
  });

  constructor(private route: ActivatedRoute, private userService:UserService, private authService: SocialAuthService) {
  }

  async connectDiscord(user: SocialUser | undefined = undefined){
    this.loginError = false;
    this.load = true
    // login ou google
    let res = undefined
    let userEmail : string;
    if (user == undefined){
      const userDetails:  Pick<User, "email" | "password"> = {
        email: <string>this.loginForm.value.email,
        password: <string>this.loginForm.value.password
      };
      userEmail = userDetails.email
      try {
        res = await axios.post(`${API_URL}/auth/login`, userDetails);
      }catch (e) {
        console.log("catch")
        this.loginError = true;
        return
      }
      if (res == undefined || res.status != 200 ){
        console.log("Erreur lors de la connexion")
        this.loginError = true;
        return
      }
    }else{
      const userDetails = {name: user!.name, email: user!.email, firstname : user!.firstName, lastname: user!.lastName};
      userEmail = userDetails.email
      try {
        res = await axios.post(`${API_URL}/auth/googleregister`, userDetails);
      }catch (e) {
        console.log("catch")
        this.googleError = true;
        return
      }
      if (res == undefined || res.status != 200 ){
        console.log("Erreur lors de la connexion")
        this.googleError = true;
        return
      }
    }
    let modale = <HTMLDialogElement>document.getElementById("validate_modale");
    //requete to discord
    try {
      res = await axios.post(`${API_URL}/auth/discord`, {userEmail: userEmail, discordUsername: this.discordUsername, discordId: this.discordId});
    }catch (e) {
      console.log("Erreur lors de la connexion");
      modale = <HTMLDialogElement>document.getElementById("error_modale");
    }
    console.log("Send request, "+userEmail+" : "+this.discordUsername+" : "+this.discordId)
    if (res == undefined || res.status != 200){
      console.log("Erreur lors de la connexion");
       modale = <HTMLDialogElement>document.getElementById("error_modale");
    }
    modale.showModal();
    this.load = false
  }

  ngOnInit() {
    this.userService.disconnect();
    this.authService.signOut();
    let userId: string = this.route.snapshot.params['idUser'];
    let userName: string = this.route.snapshot.params['userName'];
    if (userId == undefined && userName == undefined){
      this.discordUsername = decodeURIComponent(window.location.pathname.split('/')[window.location.pathname.split('/').length-2])
      this.discordId = decodeURIComponent(window.location.pathname.split('/')[window.location.pathname.split('/').length-1])
    }else {
      this.discordUsername = userName
      this.discordId = userId
    }
    this.authService.authState.subscribe((user) => {
      this.connectDiscord(user);
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  closePage(){
    setInterval(
      window.close, 800
    )
  }
}
