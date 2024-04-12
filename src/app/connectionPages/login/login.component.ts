import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {GoogleLoginComponent} from "../google-login/google-login.component";
import {NgIf} from "@angular/common";
import {type User} from "../../../model/user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GoogleLoginComponent,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading = false;
  submittedAndInvalid: boolean = false;
  infosDontMatch: boolean = false;

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

  @Output() pageChange = new EventEmitter<number>();

  constructor(private userService : UserService) {}

  async login() {
    this.loading = true;
    if(this.loginForm.status === "VALID"){
      this.submittedAndInvalid = false;
      const userDetails:  Pick<User, "email" | "password"> = {
        email: <string>this.loginForm.value.email,
        password: <string>this.loginForm.value.password
      };
      console.log(userDetails)
      await this.userService.login(userDetails).catch(() => this.infosDontMatch = true);
    } else {
      this.submittedAndInvalid = true;
    }
    this.loading = false;
  }

  changePage() {
    this.pageChange.emit(1);
  }
}
