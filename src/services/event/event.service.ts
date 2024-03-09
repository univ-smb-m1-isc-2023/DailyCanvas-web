import { Injectable } from '@angular/core';
import {GenericService} from "../GenericService";

@Injectable({
  providedIn: 'root'
})
export class EventService extends GenericService<Event>{

  constructor() {
    super("event");
  }
}
