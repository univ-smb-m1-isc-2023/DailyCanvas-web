import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../services/event/event.service";
import {Event} from "../../../model/event";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
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

}
