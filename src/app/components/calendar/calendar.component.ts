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
  birthdays: Event[] = [];
  error: boolean = false;

  constructor(private userService:UserService,private eventService: EventService) {
  }

  ngOnInit(){
    this.getEvents()
    this.getAnniversary()
  }

  async getEvents(){
    let userId = this.userService.getLocalUser()?.id
    if (userId == undefined){
      this.error = true
    }else{
      this.events = await this.eventService.getAllOfUserToday(userId!);
    }
  }

  async getAnniversary(){
    let userId = this.userService.getLocalUser()?.id
    if (userId == undefined) {
      this.error = true
    }
    else {
      this.birthdays = await this.eventService.getAllBirthdaysOfUser(userId!);
    }
  }

  getStringDate(date :Date){
    const options: Intl.DateTimeFormatOptions = {

      hour: '2-digit',
      minute: 'numeric'
    };
    return new Date(date).toLocaleTimeString('fr-FR', options);
  }
}
