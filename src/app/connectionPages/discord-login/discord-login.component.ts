import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-discord-login',
  standalone: true,
  imports: [],
  templateUrl: './discord-login.component.html',
  styleUrl: './discord-login.component.css'
})
export class DiscordLoginComponent implements OnInit{

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let userId: string = this.route.snapshot.params['idUser'];
    if (userId == undefined){
      userId = decodeURIComponent(window.location.pathname.split('/')[window.location.pathname.split('/').length-1])
    }
    console.log(userId)
  }
}
