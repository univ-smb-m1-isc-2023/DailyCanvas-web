import {Component, EventEmitter, Output} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {FormsModule} from "@angular/forms";
import {GoogleLoginComponent} from "../google-login/google-login.component";
@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FormsModule,
        GoogleLoginComponent
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loading = false;
  error: string = "";
  userDetails = {
    username: '',
    email: '',
    password: ''
  }
  @Output() pageChange = new EventEmitter<number>();

  constructor(private userService: UserService) {}

  async register(form: any) {
    this.loading = true;
    this.error = "";
    let res = await this.userService.register(this.userDetails);
    console.log(res)
    if (typeof res === "number" || !res) {
      if (!res){
        this.error = "Erreur lors de la création de votre compte"
      }else{
        switch (res){
          case 409:
            this.error = "Un compte avec cet email existe déjà !"
            break;
          default:
            this.error = "Erreur lors de la création de votre compte"
            break;
        }
      }
    }
    this.loading = false;
    console.log(this.error, this.loading)
  }

  changePage() {
    this.pageChange.emit(2);
  }

  changePageEvent($event: number){
    this.pageChange.emit($event)
  }
}
