import { Injectable } from '@angular/core';
import {GenericService} from "../GenericService";
import {type EntryType} from "../../model/entry-type";
import axios from "axios";
import {API_URL} from "../utils";

@Injectable({
  providedIn: 'root'
})
export class EntryTypeService extends GenericService<EntryType>{

  constructor() {
    super('entry-type');
  }

  async getEmojis(): Promise<EntryType[]> {
    const response = await axios.get(`${API_URL}/${this.url}/emojis`);
    return response.data;
  }

  entryTypesIsText(entryType: EntryType[]): boolean {
    if(entryType.length > 0){
      if(entryType[0].id === 2){
        return true;
      }
    }
    return false;
  }

  entryTypesIsNumber(entryType: EntryType[]): boolean {
    if(entryType.length > 0){
      if(entryType[0].id === 3){
        return true;
      }
    }
    return false;
  }

  entryTypesIsEmoji(entryType: EntryType[]): boolean {
    if(entryType.length > 0){
      if(!this.entryTypesIsText(entryType) && !this.entryTypesIsNumber(entryType)){
        return true;
      }
    }
    return false;
  }
}
