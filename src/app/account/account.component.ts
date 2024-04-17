import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{
  user: User | undefined;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getLocalUser()
  }

  disconnect() {
    this.userService.disconnect();
  }
}
