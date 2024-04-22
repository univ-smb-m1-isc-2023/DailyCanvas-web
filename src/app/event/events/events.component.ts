import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../services/event/event.service";
import {Event} from "../../../model/event";
import {NgIf} from "@angular/common";
import {UserService} from "../../../services/user/user.service";
import {FloatingNavComponent, NavElement} from "../../elements/floating-nav/floating-nav.component";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [NgIf, FloatingNavComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  redirectLinks: NavElement[] = [
    {
      name: "Ajouter un évènement",
      link: "/event/create"
    }
  ];
  events!: Event[];

  constructor(private eventService: EventService, private userService: UserService) {
  }

  async ngOnInit() {
    await this.getEvents();
  }

  async getEvents(){
    this.events = await this.eventService.getAllOfUser(this.userService.getLocalUser()!.id);
  }

  getStringDate(date: Date, dateOnly: boolean){
    let options: Intl.DateTimeFormatOptions;
    if(dateOnly){
      options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
    } else {
      options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: 'numeric'
      };
    }
    const dateStringify = new Date(date).toLocaleDateString('fr-FR', options);
    return dateStringify.charAt(0).toUpperCase() + dateStringify.substring(1);
  }
}
