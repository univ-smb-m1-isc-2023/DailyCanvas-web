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

  async getAllOfUser(idUser: number): Promise<Event[]> {
    const response = await axios.get(`${API_URL}/${this.url}/byUser/`+idUser);
    return response.data;
  }

  async getAllOfUserToday(idUser: number): Promise<Event[]> {
    const response = await axios.get(`${API_URL}/${this.url}/today/`+idUser);
    return response.data;
  }

  async getAllBirthdaysOfUser(idUser: number): Promise<Event[]> {
    const response = await axios.get(`${API_URL}/${this.url}/anniversary/`+idUser);
    return response.data;
  }
}
