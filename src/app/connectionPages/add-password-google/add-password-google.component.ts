import {Component, Input, input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {GoogleLoginComponent} from "../google-login/google-login.component";
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-password-google',
  standalone: true,
    imports: [
        FormsModule,
        GoogleLoginComponent
    ],
  templateUrl: './add-password-google.component.html',
  styleUrl: './add-password-google.component.css'
})
export class AddPasswordGoogleComponent {
  loading: boolean = false
  password: string = "";
  error: boolean = true;
  @Input()
  email: string = "";

  constructor(private userService: UserService, private router: Router) {
  }

  async submitPassword(form: any){
    if (this.email == "" || this.password == ""){
      this.error = true
    }
    let res = await this.userService.submitGooglePassword(form);
    if ((typeof res == "number" && res != 200)|| res == false) {
      this.error = true
    }
    this.router.navigate(["/home"])
  }

}
