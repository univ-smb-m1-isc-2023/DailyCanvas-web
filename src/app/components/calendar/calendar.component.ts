import {Component, OnInit} from '@angular/core';
import {Event} from "../../../model/event";
import {EventService} from "../../../services/event/event.service";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{
  time: Date = new Date();
  month: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  day: string[] = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
  events: Event[] = [];
  error: boolean = false;

  constructor(private userService:UserService,private eventService: EventService) {
  }

  ngOnInit(){
    this.getEvents()
  }

  async getEvents(){
    let userId = this.userService.getLocalUser()?.id
    if (userId == undefined){
      this.error = true
    }else{
      let res = await this.eventService.getAllOfUser(userId!);
      this.events = res;
    }
  }

  getStringDate(date :Date){
    date = new Date(date)
    return date.getDate()+"/"+(date.getMonth()<10?"0":"")+(date.getMonth()+1)+"/"+date.getFullYear().toString().substring(2,4)
  }
}
