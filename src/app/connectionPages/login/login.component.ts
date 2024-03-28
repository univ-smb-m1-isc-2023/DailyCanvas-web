import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading = false;
  error = false;
  private authService: inject(AuthGoogleService)

  userDetails = {
    email: '',
    password: ''
  }

  @Output() pageChange = new EventEmitter<number>();


  constructor(private userService : UserService) {}

  async login(form: any) {
    this.loading = true;
    let res = await this.userService.login(this.userDetails);
    if (!res) {
      this.error = true
    }
    this.loading = false;
  }

  changePage() {
    this.pageChange.emit(1);
  }

  signInWithGoogle() {
    this.authService.login();
  }
}
