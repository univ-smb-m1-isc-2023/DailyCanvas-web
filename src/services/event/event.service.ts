import { Injectable } from '@angular/core';
import {GenericService} from "../GenericService";
import {Event} from "../../model/event";
import axios from "axios";
import {API_URL} from "../utils";

@Injectable({
  providedIn: 'root'
})
export class EventService extends GenericService<Event>{

  constructor() {
    super("event");
  }

  async getAllOfUser(idUser: number){
    const response = await axios.get<Event[]>(`${API_URL}/event/byUser/`+idUser);
    return response.data;
  }
}
