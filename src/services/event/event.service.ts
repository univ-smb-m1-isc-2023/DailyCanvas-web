import { Injectable } from '@angular/core';
import {GenericService} from "../GenericService";
import {Event} from "../../model/event";

@Injectable({
  providedIn: 'root'
})
export class EventService extends GenericService<Event>{

  constructor() {
    super("event");
  }
}
