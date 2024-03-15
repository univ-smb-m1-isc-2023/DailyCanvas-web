import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {User} from "../../model/user";
import {NgForOf} from "@angular/common";
import {UserService} from "../../services/user/user.service";
import {LocalstoreService} from "../../services/localstore/localstore.service";
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RegisterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  loginInput: string | undefined;
  passwordInput: string | undefined;
  IDInput: string | undefined;
  user: User | null = null;

  constructor(private localstore: LocalstoreService<User>, private userService: UserService) {
  }

  ngOnInit(): void {
      this.user = this.localstore.get("user");
  }

  protected readonly LocalstoreService = LocalstoreService;

  disconnect() {
    this.userService.disconnect();
  }
}
