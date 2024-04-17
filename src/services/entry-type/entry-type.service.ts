import { Injectable } from '@angular/core';
import {GenericService} from "../GenericService";
import axios from "axios";
import {API_URL} from "../utils";
import {type EntryType} from "../../model/entry-type";

@Injectable({
  providedIn: 'root'
})
export class EntryTypeService extends GenericService<EntryType>{

  constructor() {
    super('entry-type');
  }

  async getEmojis(): Promise<any> {
    const response = await axios.get<EntryType[]>(`${API_URL}/${this.url}/emojis`);
    return response.data;
  }
  
}
