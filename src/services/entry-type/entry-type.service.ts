import { Injectable } from '@angular/core';
import {GenericService} from "../GenericService";
import {EntryType} from "../../model/entry-type";

@Injectable({
  providedIn: 'root'
})
export class EntryTypeService extends GenericService<EntryType>{

  constructor() {
    super('entry-type');
  }
}
