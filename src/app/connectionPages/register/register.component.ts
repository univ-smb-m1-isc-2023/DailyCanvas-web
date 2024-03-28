import {Component, EventEmitter, Output} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loading = false;
  error = false;
  userDetails = {
    username: '',
    email: '',
    password: ''
  }
  @Output() pageChange = new EventEmitter<number>();

  constructor(private userService: UserService) {}

  async register(form: any) {
    this.loading = true;
    let res = await this.userService.register(this.userDetails);
    if (!res) {
      this.error = true
    }
    this.loading = false;
  }

  changePage() {
    this.pageChange.emit(2);
  }
}
