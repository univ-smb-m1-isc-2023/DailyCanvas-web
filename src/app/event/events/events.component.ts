import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../services/event/event.service";
import {Event} from "../../../model/event";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [NgIf],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  events!: Event[];

  constructor(private eventService: EventService) {
  }

  async ngOnInit() {
    await this.getEvents();
  }

  async getEvents(){
    const res = await this.eventService.getAll();
    console.log(res)
    this.events = res;
  }

  getStringDate(date: Date){
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: 'numeric'
    };
    const dateStringify = new Date(date).toLocaleDateString('fr-FR', options);
    return dateStringify.charAt(0).toUpperCase() + dateStringify.substring(1);
  }
}
