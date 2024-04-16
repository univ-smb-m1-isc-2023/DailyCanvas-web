import {Component, EventEmitter, Output} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GoogleLoginComponent} from "../google-login/google-login.component";
import {NgIf} from "@angular/common";
import {type User} from "../../../model/user";
import {type ErrorType} from "../../../model/error-type";
@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        GoogleLoginComponent,
        NgIf
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loading = false;
  error: string = "";
  submittedAndInvalid: boolean = false;
  registerForm = new FormGroup({
    username: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.pattern("^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$")],
      nonNullable: true
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
  });
  @Output() pageChange = new EventEmitter<number>();

  constructor(private userService: UserService) {}

  async register() {
    this.loading = true;
    this.error = "";
    if(this.registerForm.status === "VALID"){
      this.submittedAndInvalid = false;
      const userDetails: Omit<User, "id"> = {
        username: <string>this.registerForm.value.username,
        email: <string>this.registerForm.value.email,
        password: <string>this.registerForm.value.password
      };
      await this.userService.register(userDetails)
        .then((res: boolean | ErrorType) => {
          if (typeof res === "boolean") {
            if(!res){
              this.error = "Erreur lors de la création de votre compte"
            }
          } else {
            switch (res.status) {
              case 409:
                switch (res.message){
                  case "Email already exist !":
                    this.error = "Un compte avec cet email existe déjà !";
                    break;
                  case "Username already exist !":
                    this.error = "Ce nom d'utilisateur est déjà pris."
                    break;
                  default:
                    this.error = "Erreur " + res.status + " : " + res.message;
                    break;
                }
                break;
              default:
                this.error = "Erreur " + res.status + " : " + res.message;
                break;
            }
          }
        })
        .catch(() => this.error = "Erreur lors de la création de votre compte."
      );
    } else {
      this.submittedAndInvalid = true;
    }
    this.loading = false;
  }

  changePage() {
    this.pageChange.emit(2);
  }
}
